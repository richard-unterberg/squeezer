import{F as N,j as h,r as d,L as v,I as M,a as z,i as R,b as A,c as B}from"../chunks/chunk-MsAnzK7m.js";import{_ as V}from"../chunks/chunk-V0akctQf.js";const O=N.div`
  p-5
  md:p-8
  m-0
  border
  rounded
  items-center
  text-small
  gap-2
  text-grayLight
  bg-darkLight
  border-darkLightBorder
`,_=({children:i,label:t,...e})=>h.jsxs("div",{className:"relative shadow-md",children:[h.jsx("div",{className:"absolute left-5 md:left-8 -top-3 z-10 text-gray font-bold",children:t}),h.jsx(O,{className:`${e.className} ${t?"pt-5 md:pt-8":""}`,children:i})]}),F=d.createContext(void 0),H=({children:i})=>{const[t,e]=d.useState(void 0),s=d.useMemo(()=>({lamejs:t,setLamejs:e}),[t,e]);return h.jsx(F.Provider,{value:s,children:i})},L=d.createContext(void 0),W=({children:i})=>{const[t,e]=d.useState([]),s=d.useMemo(()=>({attachments:t,setAttachments:e}),[t,e]);return h.jsx(L.Provider,{value:s,children:i})};function y(i,t,e=0,s=i.length){if(s%t)throw new Error("Bad buffer length.");for(let n=e;n<s;n+=t)$(i,t,n)}function $(i,t,e){t--;for(let s=0;s<t;s++){let n=i[e+s];i[e+s]=i[e+t],i[e+t]=n,t--}}function Z(i,t=0,e=i.length){let s="";for(let n=t;n<e;){let a=128,o=191,l=!1,r=i[n++];if(r>=0&&r<=127)s+=String.fromCharCode(r);else{let c=0;r>=194&&r<=223?c=1:r>=224&&r<=239?(c=2,i[n]===224&&(a=160),i[n]===237&&(o=159)):r>=240&&r<=244?(c=3,i[n]===240&&(a=144),i[n]===244&&(o=143)):l=!0,r=r&(1<<8-c-1)-1;for(let u=0;u<c;u++)(i[n]<a||i[n]>o)&&(l=!0),r=r<<6|i[n]&63,n++;l?s+="�":r<=65535?s+=String.fromCharCode(r):(r-=65536,s+=String.fromCharCode((r>>10&1023)+55296,(r&1023)+56320))}}return s}class q{constructor(t,e=!1,s=!1){this.bits=t,this.bytes=t<8?1:Math.ceil(t/8),this.max=Math.pow(2,t)-1,this.min=0;let n=8-((t-1|7)+1-t);this.lastByteMask_=Math.pow(2,n>0?n:8)-1,this.unpack=this.unpackUnsigned_,e&&(this.max=Math.pow(2,t)/2-1,this.min=-this.max-1,this.unpack=this.unpackSigned_),s&&(this.overflow_=this.overflowClamp_)}pack(t,e,s=0){if(e!==e||e.constructor!=Number)throw new TypeError;e=this.overflow_(e),t[s]=(e<0?e+Math.pow(2,this.bits):e)&255,s++;for(let n=2,a=this.bytes;n<a;n++)t[s]=Math.floor(e/Math.pow(2,(n-1)*8))&255,s++;return this.bits>8&&(t[s]=Math.floor(e/Math.pow(2,(this.bytes-1)*8))&this.lastByteMask_,s++),s}unpack_(t,e=0){let s=0;for(let n=0;n<this.bytes;n++)s+=t[e+n]*Math.pow(256,n);return s}unpackUnsigned_(t,e=0){return this.overflow_(this.unpack_(t,e))}unpackSigned_(t,e=0){return this.overflow_(this.sign_(this.unpack_(t,e)))}overflow_(t){if(t>this.max||t<this.min)throw new RangeError;return t}overflowClamp_(t){return t>this.max?this.max:t<this.min?this.min:t}sign_(t){return t>this.max&&(t-=this.max*2+2),t}}class x{constructor(t,e){this.ebits=t,this.fbits=e,this.bias=(1<<t-1)-1,this.numBytes=Math.ceil((t+e)/8),this.biasP2=Math.pow(2,this.bias+1),this.ebitsFbits=t+e,this.fbias=Math.pow(2,-(8*this.numBytes-1-t))}pack(t,e,s){if(typeof e!="number")throw new TypeError;Math.abs(e)>this.biasP2-this.ebitsFbits*2&&(e=e<0?-1/0:1/0);let n=((e=+e)||1/e)<0||e<0?1:0;e=Math.abs(e);let a=Math.min(Math.floor(Math.log(e)/Math.LN2),1023),o=f(e/Math.pow(2,a)*Math.pow(2,this.fbits));return e!==e?(o=Math.pow(2,this.fbits-1),a=(1<<this.ebits)-1):e!==0&&(e>=Math.pow(2,1-this.bias)?(o/Math.pow(2,this.fbits)>=2&&(a=a+1,o=1),a>this.bias?(a=(1<<this.ebits)-1,o=0):(a=a+this.bias,o=f(o)-Math.pow(2,this.fbits))):(o=f(e/Math.pow(2,1-this.bias-this.fbits)),a=0)),this.packFloatBits_(t,s,n,a,o)}unpack(t,e){let s=(1<<this.ebits)-1,n,a="";for(let r=this.numBytes-1;r>=0;r--){let c=t[r+e].toString(2);a+="00000000".substring(c.length)+c}let o=a.charAt(0)=="1"?-1:1;a=a.substring(1);let l=parseInt(a.substring(0,this.ebits),2);return a=a.substring(this.ebits),l==s?parseInt(a,2)!==0?NaN:o*(1/0):(l===0?(l+=1,n=parseInt(a,2)):n=parseInt("1"+a,2),o*n*this.fbias*Math.pow(2,l-this.bias))}packFloatBits_(t,e,s,n,a){let o=[];o.push(s);for(let p=this.ebits;p>0;p-=1)o[p]=n%2?1:0,n=Math.floor(n/2);let l=o.length;for(let p=this.fbits;p>0;p-=1)o[l+p]=a%2?1:0,a=Math.floor(a/2);let r=o.join(""),c=this.numBytes+e-1,u=e;for(;c>=e;)t[c]=parseInt(r.substring(0,8),2),r=r.substring(8),c--,u++;return u}}function f(i){let t=Math.floor(i),e=i-t;return e<.5?t:e>.5||t%2?t+1:t}function S(i,t=0,e=i.length){return Z(i,t,e)}function J(i,t,e,s=0,n=i.length,a=!1,o=!1){t=t||{};let l=K(t.bits,t.fp,t.signed,o),r=Math.ceil(t.bits/8);n=G(i,s,n,r,a);let c=0,u=s;try{for(t.be&&y(i,r,s,n);u<n;u+=r,c++)e[c]=l.unpack(i,u);t.be&&y(i,r,s,n)}catch(p){Y(p,i.slice(u,u+r),u)}}function X(i,t,e=0,s=i.length,n=!1,a=!1){let o=[];return J(i,t,o,e,s,n,a),o}function C(i,t,e=0,s=!1){return X(i,t,e,e+Math.ceil(t.bits/8),!0,s)[0]}function Y(i,t,e){throw i.message=i.constructor.name+" at index "+e+": "+t,i}function G(i,t,e,s,n){let a=(e-t)%s;if(n&&(a||i.length<s))throw new Error("Bad buffer length");return e-a}function K(i,t,e,s){return t?Q(i):tt(i),t&&i===16?new x(5,11):t&&i==32?new x(8,23):t&&i==64?new x(11,52):new q(i,e,s)}const E="Unsupported type";function Q(i){if(!i||i!==16&&i!==32&&i!==64)throw new Error(E+": float, bits: "+i)}function tt(i){if(!i||i<1||i>53)throw new Error(E+": int, bits: "+i)}class et{constructor(){this.container="",this.chunkSize=0,this.format="",this.signature=null,this.head=0,this.uInt32={bits:32,be:!1,signed:!1,fp:!1},this.supported_containers=["RIFF","RIFX"]}setSignature(t){if(this.head=0,this.container=this.readString(t,4),this.supported_containers.indexOf(this.container)===-1)throw Error("Not a supported format.");this.uInt32.be=this.container==="RIFX",this.chunkSize=this.readUInt32(t),this.format=this.readString(t,4),this.signature={chunkId:this.container,chunkSize:this.chunkSize,format:this.format,subChunks:this.getSubChunksIndex_(t),chunkData:{start:0,end:this.chunkSize}}}findChunk(t,e=!1){let s=this.signature.subChunks,n=[];for(let a=0;a<s.length;a++)if(s[a].chunkId==t)if(e)n.push(s[a]);else return s[a];return t=="LIST"&&n.length?n:null}readString(t,e){let s="";return s=S(t,this.head,this.head+e),this.head+=e,s}readUInt32(t){let e=C(t,this.uInt32,this.head);return this.head+=4,e}getSubChunksIndex_(t){let e=[],s=this.head;for(;s<=t.length-8;)e.push(this.getSubChunkIndex_(t,s)),s+=8+e[e.length-1].chunkSize,s=s%2?s+1:s;return e}getSubChunkIndex_(t,e){let s={chunkId:this.getChunkId_(t,e),chunkSize:this.getChunkSize_(t,e)};if(s.chunkId=="LIST")s.format=S(t,e+8,e+12),this.head+=4,s.subChunks=this.getSubChunksIndex_(t);else{let n=s.chunkSize%2?s.chunkSize+1:s.chunkSize;this.head=e+8+n,s.chunkData={start:e+8,end:this.head}}return s}getChunkId_(t,e){return this.head+=4,S(t,e,e+4)}getChunkSize_(t,e){return this.head+=4,C(t,this.uInt32,e+4)}}class U extends et{constructor(t=null,e=!0){super(),this.supported_containers.push("RF64"),this.fmt={chunkId:"",chunkSize:0,audioFormat:0,numChannels:0,sampleRate:0,byteRate:0,blockAlign:0,bitsPerSample:0,cbSize:0,validBitsPerSample:0,dwChannelMask:0,subformat:[]},this.fact={chunkId:"",chunkSize:0,dwSampleLength:0},this.cue={chunkId:"",chunkSize:0,dwCuePoints:0,points:[]},this.smpl={chunkId:"",chunkSize:0,dwManufacturer:0,dwProduct:0,dwSamplePeriod:0,dwMIDIUnityNote:0,dwMIDIPitchFraction:0,dwSMPTEFormat:0,dwSMPTEOffset:0,dwNumSampleLoops:0,dwSamplerData:0,loops:[]},this.bext={chunkId:"",chunkSize:0,description:"",originator:"",originatorReference:"",originationDate:"",originationTime:"",timeReference:[0,0],version:0,UMID:"",loudnessValue:0,loudnessRange:0,maxTruePeakLevel:0,maxMomentaryLoudness:0,maxShortTermLoudness:0,reserved:"",codingHistory:""},this.ds64={chunkId:"",chunkSize:0,riffSizeHigh:0,riffSizeLow:0,dataSizeHigh:0,dataSizeLow:0,originationTime:0,sampleCountHigh:0,sampleCountLow:0},this.data={chunkId:"",chunkSize:0,samples:new Uint8Array(0)},this.LIST=[],this.junk={chunkId:"",chunkSize:0,chunkData:[]},this.uInt16={bits:16,be:!1,signed:!1,fp:!1},t&&this.fromBuffer(t,e)}fromBuffer(t,e=!0){if(this.clearHeaders(),this.setSignature(t),this.uInt16.be=this.uInt32.be,this.format!="WAVE")throw Error('Could not find the "WAVE" format identifier');this.readDs64Chunk_(t),this.readFmtChunk_(t),this.readFactChunk_(t),this.readBextChunk_(t),this.readCueChunk_(t),this.readSmplChunk_(t),this.readDataChunk_(t,e),this.readJunkChunk_(t),this.readLISTChunk_(t)}clearHeaders(){let t=new U;Object.assign(this.fmt,t.fmt),Object.assign(this.fact,t.fact),Object.assign(this.cue,t.cue),Object.assign(this.smpl,t.smpl),Object.assign(this.bext,t.bext),Object.assign(this.ds64,t.ds64),Object.assign(this.data,t.data),this.LIST=[],Object.assign(this.junk,t.junk)}readFmtChunk_(t){let e=this.findChunk("fmt ");if(e)this.head=e.chunkData.start,this.fmt.chunkId=e.chunkId,this.fmt.chunkSize=e.chunkSize,this.fmt.audioFormat=this.readUInt16_(t),this.fmt.numChannels=this.readUInt16_(t),this.fmt.sampleRate=this.readUInt32(t),this.fmt.byteRate=this.readUInt32(t),this.fmt.blockAlign=this.readUInt16_(t),this.fmt.bitsPerSample=this.readUInt16_(t),this.readFmtExtension_(t);else throw Error('Could not find the "fmt " chunk')}readFmtExtension_(t){this.fmt.chunkSize>16&&(this.fmt.cbSize=this.readUInt16_(t),this.fmt.chunkSize>18&&(this.fmt.validBitsPerSample=this.readUInt16_(t),this.fmt.chunkSize>20&&(this.fmt.dwChannelMask=this.readUInt32(t),this.fmt.subformat=[this.readUInt32(t),this.readUInt32(t),this.readUInt32(t),this.readUInt32(t)])))}readFactChunk_(t){let e=this.findChunk("fact");e&&(this.head=e.chunkData.start,this.fact.chunkId=e.chunkId,this.fact.chunkSize=e.chunkSize,this.fact.dwSampleLength=this.readUInt32(t))}readCueChunk_(t){let e=this.findChunk("cue ");if(e){this.head=e.chunkData.start,this.cue.chunkId=e.chunkId,this.cue.chunkSize=e.chunkSize,this.cue.dwCuePoints=this.readUInt32(t);for(let s=0;s<this.cue.dwCuePoints;s++)this.cue.points.push({dwName:this.readUInt32(t),dwPosition:this.readUInt32(t),fccChunk:this.readString(t,4),dwChunkStart:this.readUInt32(t),dwBlockStart:this.readUInt32(t),dwSampleOffset:this.readUInt32(t)})}}readSmplChunk_(t){let e=this.findChunk("smpl");if(e){this.head=e.chunkData.start,this.smpl.chunkId=e.chunkId,this.smpl.chunkSize=e.chunkSize,this.smpl.dwManufacturer=this.readUInt32(t),this.smpl.dwProduct=this.readUInt32(t),this.smpl.dwSamplePeriod=this.readUInt32(t),this.smpl.dwMIDIUnityNote=this.readUInt32(t),this.smpl.dwMIDIPitchFraction=this.readUInt32(t),this.smpl.dwSMPTEFormat=this.readUInt32(t),this.smpl.dwSMPTEOffset=this.readUInt32(t),this.smpl.dwNumSampleLoops=this.readUInt32(t),this.smpl.dwSamplerData=this.readUInt32(t);for(let s=0;s<this.smpl.dwNumSampleLoops;s++)this.smpl.loops.push({dwName:this.readUInt32(t),dwType:this.readUInt32(t),dwStart:this.readUInt32(t),dwEnd:this.readUInt32(t),dwFraction:this.readUInt32(t),dwPlayCount:this.readUInt32(t)})}}readDataChunk_(t,e){let s=this.findChunk("data");if(s)this.data.chunkId="data",this.data.chunkSize=s.chunkSize,e&&(this.data.samples=t.slice(s.chunkData.start,s.chunkData.end));else throw Error('Could not find the "data" chunk')}readBextChunk_(t){let e=this.findChunk("bext");e&&(this.head=e.chunkData.start,this.bext.chunkId=e.chunkId,this.bext.chunkSize=e.chunkSize,this.bext.description=this.readString(t,256),this.bext.originator=this.readString(t,32),this.bext.originatorReference=this.readString(t,32),this.bext.originationDate=this.readString(t,10),this.bext.originationTime=this.readString(t,8),this.bext.timeReference=[this.readUInt32(t),this.readUInt32(t)],this.bext.version=this.readUInt16_(t),this.bext.UMID=this.readString(t,64),this.bext.loudnessValue=this.readUInt16_(t),this.bext.loudnessRange=this.readUInt16_(t),this.bext.maxTruePeakLevel=this.readUInt16_(t),this.bext.maxMomentaryLoudness=this.readUInt16_(t),this.bext.maxShortTermLoudness=this.readUInt16_(t),this.bext.reserved=this.readString(t,180),this.bext.codingHistory=this.readString(t,this.bext.chunkSize-602))}readDs64Chunk_(t){let e=this.findChunk("ds64");if(e)this.head=e.chunkData.start,this.ds64.chunkId=e.chunkId,this.ds64.chunkSize=e.chunkSize,this.ds64.riffSizeHigh=this.readUInt32(t),this.ds64.riffSizeLow=this.readUInt32(t),this.ds64.dataSizeHigh=this.readUInt32(t),this.ds64.dataSizeLow=this.readUInt32(t),this.ds64.originationTime=this.readUInt32(t),this.ds64.sampleCountHigh=this.readUInt32(t),this.ds64.sampleCountLow=this.readUInt32(t);else if(this.container=="RF64")throw Error('Could not find the "ds64" chunk')}readLISTChunk_(t){let e=this.findChunk("LIST",!0);if(e!==null)for(let s=0;s<e.length;s++){let n=e[s];this.LIST.push({chunkId:n.chunkId,chunkSize:n.chunkSize,format:n.format,subChunks:[]});for(let a=0;a<n.subChunks.length;a++)this.readLISTSubChunks_(n.subChunks[a],n.format,t)}}readLISTSubChunks_(t,e,s){if(e=="adtl"){if(["labl","note","ltxt"].indexOf(t.chunkId)>-1){this.head=t.chunkData.start;let n={chunkId:t.chunkId,chunkSize:t.chunkSize,dwName:this.readUInt32(s)};t.chunkId=="ltxt"&&(n.dwSampleLength=this.readUInt32(s),n.dwPurposeID=this.readUInt32(s),n.dwCountry=this.readUInt16_(s),n.dwLanguage=this.readUInt16_(s),n.dwDialect=this.readUInt16_(s),n.dwCodePage=this.readUInt16_(s)),n.value=this.readZSTR_(s,this.head),this.LIST[this.LIST.length-1].subChunks.push(n)}}else e=="INFO"&&(this.head=t.chunkData.start,this.LIST[this.LIST.length-1].subChunks.push({chunkId:t.chunkId,chunkSize:t.chunkSize,value:this.readZSTR_(s,this.head)}))}readJunkChunk_(t){let e=this.findChunk("junk");e&&(this.junk={chunkId:e.chunkId,chunkSize:e.chunkSize,chunkData:[].slice.call(t.slice(e.chunkData.start,e.chunkData.end))})}readZSTR_(t,e=0){for(let s=e;s<t.length&&(this.head++,t[s]!==0);s++);return S(t,e,this.head-1)}readUInt16_(t){let e=C(t,this.uInt16,this.head);return this.head+=2,e}}const st=i=>new Promise((t,e)=>{const s=i.slice(0,i.size,i.type),n=new FileReader;n.onload=()=>{n.result instanceof ArrayBuffer?t(n.result):e(new Error("Failed to read Blob as ArrayBuffer."))},n.onerror=()=>{e(new Error("Error reading Blob as ArrayBuffer."))},n.readAsArrayBuffer(s)}),it=async({file:i,lameLib:t})=>{if(!t)throw new Error("lamejs is undefined");return await st(i).then(s=>{const a=new U(new Uint8Array(s)).fmt,o={channels:a.numChannels,sampleRate:a.sampleRate,bitRate:320},l=new t.Mp3Encoder(o.channels,o.sampleRate,320),r=new Int16Array(s),c=[],u=1152*2;if(o.channels===1)for(let k=0;k<r.length;k+=u){const I=r.subarray(k,k+u),m=l.encodeBuffer(I);m.length>0&&c.push(m)}else if(o.channels===2){const k=new Int16Array(r.length/2),I=new Int16Array(r.length/2);for(let m=0,g=0;m<r.length;m+=2,g+=1)k[g]=r[m],I[g]=r[m+1];for(let m=0;m<r.length/2;m+=u){const g=k.subarray(m,m+u),D=I.subarray(m,m+u),j=l.encodeBuffer(g,D);j.length>0&&c.push(j)}}const p=l.flush();p.length>0&&c.push(p);const T=new Blob(c,{type:"audio/mp3"});return new File([T],`${i.name}.mp3`,{type:"audio/mp3"})})},nt=i=>i.type==="audio/wav",w=()=>{const i=d.useContext(L),t=d.useMemo(()=>(i==null?void 0:i.attachments)||[],[i==null?void 0:i.attachments]),[e,s]=d.useState(!1),n=d.useMemo(()=>(i==null?void 0:i.setAttachments)||(()=>[]),[i==null?void 0:i.setAttachments]),a=d.useCallback(o=>{o.forEach(l=>{if(!nt(l)){s(!0);return}n(r=>[...r,l]),s(!1)})},[n]);if(!i)throw new Error("useUploadContext must be used within a Dialog");return{attachments:t,formatError:e,setAttachments:a}},P=()=>{const i=d.useContext(F),t=d.useMemo(()=>i==null?void 0:i.lamejs,[i==null?void 0:i.lamejs]),e=d.useMemo(()=>i==null?void 0:i.setLamejs,[i==null?void 0:i.setLamejs]),{attachments:s}=w(),n=d.useCallback(()=>{s.forEach(a=>{it({file:a,lameLib:t}).then(o=>{const l=document.createElement("a");l.href=URL.createObjectURL(o),l.download=o.name,l.click()}).catch(o=>{throw new Error(o)})})},[s,t]);return{lamejs:t,setLamejs:e,handleConvert:n}},at=()=>{const{handleConvert:i}=P();return d.useMemo(()=>h.jsx(v,{hasButtonStyle:!0,className:"bg-success ",onClick:i,children:"Convert & Download"}),[i])},b=({label:i})=>{const t=d.useRef(null),{setAttachments:e}=w(),s=d.useCallback(()=>{t.current&&t.current.click()},[]),n=d.useCallback(a=>{const o=Array.from(a.target.files||[]);e(o)},[e]);return h.jsxs(h.Fragment,{children:[h.jsx(v,{hasButtonStyle:!0,className:"bg-primary",onClick:s,children:i?` ${i}`:"Select Files"}),h.jsx("input",{type:"file",ref:t,className:"hidden",multiple:!0,onChange:n})]})},ht=()=>{const{attachments:i}=w();return h.jsx("div",{children:h.jsx(_,{label:"File List",className:"overflow-hidden relative",children:h.jsxs("div",{className:" relative z-20",children:[h.jsxs("div",{className:"flex gap-2 justify-between mt-2 mb-6 border-y-darkLighter items-center",children:[h.jsx("p",{children:"Drag and Drop directly onto the list or page"}),h.jsx(b,{label:"Select more files"})]}),i.map(t=>h.jsxs("div",{className:"flex gap-2 py-2 border-b border-dashed border-y-darkLighter items-center",children:[h.jsx("p",{children:h.jsx(M,{icon:z.FileVolume,className:"text-warning h-4 w-4"})}),h.jsx("p",{className:"flex-1",children:t.name}),h.jsxs("p",{className:"text-gray",children:[(t.size/1e3/1e3).toFixed(2)," ",h.jsx("span",{className:"text-sm",children:"MB"})]})]},t.name))]})})})},rt=()=>h.jsxs(_,{className:"bg-opacity-50 mb-10 relative overflow-hidden justify-between md:flex items-center",label:"How It Works:",children:[h.jsx(M,{icon:z.Drum,className:"text-darkLight absolute h-40 w-40 right-5 top-5"}),h.jsxs("ul",{className:"grid grid-cols-1 md:grid-cols-2 relative gap-3",children:[h.jsxs("li",{children:[h.jsx("strong",{children:"Select Files:"}),h.jsx("br",{})," Simply drag and drop your WAV file onto the page or use button below."]}),h.jsxs("li",{children:[h.jsx("strong",{children:"Convert:"}),h.jsx("br",{})," Convert & Get your MP3 file instantly, ready for use."]})]})]}),ot=()=>{const{attachments:i,setAttachments:t}=w(),{setLamejs:e}=P();d.useEffect(()=>{V(()=>import("../chunks/chunk-gbz5wM3y.js").then(a=>a.i),__vite__mapDeps([])).then(a=>{e&&e(a)}).catch(a=>{throw new Error(`Failed to load lamejs: ${a}`)})},[e]);const s=d.useMemo(()=>h.jsx(_,{className:"flex justify-center my-10 p-14 bg-darkLight border-dashed",children:h.jsx(b,{})}),[]),n=d.useMemo(()=>h.jsxs(h.Fragment,{children:[h.jsx(ht,{}),h.jsx("div",{className:"w-full flex justify-center mt-6 mb-16",children:h.jsx(at,{})})]}),[]);return h.jsxs("div",{children:[i.length?n:s,h.jsx(rt,{}),h.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[h.jsxs("p",{children:[h.jsx("span",{className:"font-bold text-primary",children:"Privacy matters."})," Your files are never stored on a server — everything is processed entirely within your browser, ensuring your data remains secure and confidential."]}),h.jsx("p",{children:"Embrace the freedom to convert as many files as you need, without any limitations. Experience the convenience of our browser-based WAV to MP3 converter today."})]})]})},lt=()=>h.jsx(W,{children:h.jsx(H,{children:h.jsx(ot,{})})}),dt=Object.freeze(Object.defineProperty({__proto__:null,default:lt},Symbol.toStringTag,{value:"Module"})),pt=[{configName:"onRenderClient",importPath:"/renderer/+onRenderClient.tsx",isValueFile:!0,exportValues:R},{configName:"onPageTransitionStart",importPath:"/renderer/+onPageTransitionStart.ts",isValueFile:!0,exportValues:A},{configName:"onPageTransitionEnd",importPath:"/renderer/+onPageTransitionEnd.ts",isValueFile:!0,exportValues:B},{configName:"Page",importPath:"/pages/index/+Page.tsx",isValueFile:!0,exportValues:dt}],kt={onBeforeRenderEnv:{definedAt:{isComputed:!0},valueSerialized:"null"},dataEnv:{definedAt:{isComputed:!0},valueSerialized:"null"},title:{definedAt:{filePathToShowToUser:"/pages/index/+config.h.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:'"squeez - wav to mp3 converter - no registration, no ads, no tracking"'},description:{definedAt:{filePathToShowToUser:"/pages/index/+config.h.ts",fileExportPathToShowToUser:["default","description"]},valueSerialized:`"Tired of searching for a reliable WAV to MP3 converter that doesn't come with limitations or require registrations? So was I. That's why I created this hassle-free solution to help you seamlessly convert your audio files in the browser. 💫"`}};export{pt as configValuesImported,kt as configValuesSerialized};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}