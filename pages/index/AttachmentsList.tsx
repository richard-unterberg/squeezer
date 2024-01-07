import BoxElement from '#components/BoxElement'
import Icon from '#components/Icon'
import useUploadContext from '#hooks/useUploadContext'
import { ICON_ID } from '#lib/icons/iconID'
import UploadButton from '#pages/index/UploadButton'

const AttachmentsList = () => {
  const { attachments, removeAttachment } = useUploadContext()

  return (
    <div>
      <BoxElement label="File List" className="overflow-hidden relative">
        <div className=" relative z-20">
          <div className="flex gap-2 justify-between mt-2 mb-6 border-y-darkLighter items-center">
            <p>Drag and Drop directly onto the list or page</p>
            <UploadButton label="Select more files" />
          </div>
          {attachments.map(file => (
            <div
              key={file.name}
              className="flex gap-2 py-2 border-b border-dashed border-y-darkLighter items-center"
            >
              <p>
                <Icon icon={ICON_ID.FileVolume} className="text-warning h-4 w-4" />
              </p>
              <p className="flex-1">{file.name}</p>
              <p className="text-gray">
                {(file.size / 1000 / 1000).toFixed(2)} <span className="text-sm">MB</span>
              </p>
              <div
                onPointerDown={() => removeAttachment(file.name)}
                className=" bg-error rounded-full p-1 cursor-pointer"
              >
                <Icon icon={ICON_ID.Trash} className="text-white h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </BoxElement>
    </div>
  )
}

export default AttachmentsList
