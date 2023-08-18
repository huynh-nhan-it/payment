import { BsFileEarmarkExcel, BsFileEarmarkImage, BsFileEarmarkPdf, BsFileEarmarkText, BsFileEarmarkWord, BsFileEarmarkZip, BsFiletypeExe, BsFiletypeTxt } from "react-icons/bs"

const size = '8%';
export const reactIcon: any = {
    pdf: (<BsFileEarmarkPdf size={size}></BsFileEarmarkPdf>),
    xlsx: (<BsFileEarmarkExcel size={size}></BsFileEarmarkExcel>),
    docx: (<BsFileEarmarkWord size={size}></BsFileEarmarkWord>),
    exe: (<BsFiletypeExe size={size}></BsFiletypeExe>),
    zip: (<BsFileEarmarkZip size={size}></BsFileEarmarkZip>),
    txt: (<BsFiletypeTxt size={size}></BsFiletypeTxt>),
    png: (<BsFileEarmarkImage size={size}></BsFileEarmarkImage>),
    undefinedFile: (<BsFileEarmarkText size={size}></BsFileEarmarkText>)
}