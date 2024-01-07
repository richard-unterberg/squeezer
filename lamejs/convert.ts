import { WaveFileReader } from 'wavefile-reader'

const fileToArrayBuffer = (file: File) =>
  new Promise<ArrayBuffer>((resolve, reject) => {
    const blob = file.slice(0, file.size, file.type)
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to read Blob as ArrayBuffer.'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Error reading Blob as ArrayBuffer.'))
    }

    reader.readAsArrayBuffer(blob)
  })

interface ConvertToParams {
  file: File
  lameLib: typeof import('lamejs') | undefined
}

interface extendendWaveFileReader extends WaveFileReader {
  numChannels: number
  sampleRate: number
}

const convertTo = async ({ file, lameLib }: ConvertToParams) => {
  if (!lameLib) {
    throw new Error('lamejs is undefined')
  }

  const resolvedFilePromise = await fileToArrayBuffer(file).then(arrayBuffer => {
    const reader = new WaveFileReader(new Uint8Array(arrayBuffer))
    const wavReaderFMT = reader.fmt as extendendWaveFileReader

    const fileConfig = {
      channels: wavReaderFMT.numChannels,
      sampleRate: wavReaderFMT.sampleRate,
      bitRate: 320,
    }

    const mp3encoder = new lameLib.Mp3Encoder(fileConfig.channels, fileConfig.sampleRate, 320)

    const samples = new Int16Array(arrayBuffer)
    const mp3Data: Uint8Array[] = []
    const sampleBlockSize = 1152 * 2

    if (fileConfig.channels === 1) {
      // Mono channel processing
      for (let i = 0; i < samples.length; i += sampleBlockSize) {
        const chunk = samples.subarray(i, i + sampleBlockSize)

        const mp3buf = mp3encoder.encodeBuffer(chunk)
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf)
        }
      }
    } else if (fileConfig.channels === 2) {
      // Stereo channel processing
      const left = new Int16Array(samples.length / 2)
      const right = new Int16Array(samples.length / 2)

      for (let i = 0, j = 0; i < samples.length; i += 2, j += 1) {
        left[j] = samples[i]
        right[j] = samples[i + 1]
      }

      for (let i = 0; i < samples.length / 2; i += sampleBlockSize) {
        const leftChunk = left.subarray(i, i + sampleBlockSize)
        const rightChunk = right.subarray(i, i + sampleBlockSize)

        const mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk)
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf)
        }
      }
    }

    const mp3res = mp3encoder.flush()

    if (mp3res.length > 0) {
      mp3Data.push(mp3res)
    }

    const mp3Blob = new Blob(mp3Data, { type: 'audio/mp3' })
    const mp3File = new File([mp3Blob], `${file.name}.mp3`, { type: 'audio/mp3' })

    return mp3File
  })

  return resolvedFilePromise
}

export default convertTo
