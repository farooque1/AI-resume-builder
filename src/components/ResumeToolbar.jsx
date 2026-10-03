import { useState } from "react";
import {
  FiRefreshCw,
  FiEdit,
  FiType,
  FiDownload,
  FiFile,
  FiFileText,
  FiEye,
  FiChevronDown,
  FiLayout,
} from "react-icons/fi";

import { MdColorLens } from "react-icons/md";
import TooltipButton from "./TooltipButton";

const ResumeToolbar = ({
    showRefresh = true,
    showEdit = true,
    showPreview = true,
    showTypography = true,
    showColor = true,
    showDownload = true,
    showDocx = true,
    showTemplate = true,
    onRefresh,
    onEdit,
    onPreview,
    onChangeTemplate,
    onTypography,
    onColorChange,
    onDownloadPdf,
    onDownloadDocx,
    onDownloadPng,
    onDownloadJson,
}) => {

    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <div className="w-full flex justify-center mb-1">
            <div className="flex justify-center items-center bg-gray-600 rounded-full px-4 py-2 mb-2 shadow-md w-fit">

                {/* Left Icons */}
                <div className="flex items-center gap-4 text-white">
                    {showRefresh && (<TooltipButton
                        label="Reset Resume"
                        onClick={onRefresh}
                        className="hover:text-cyan-300 transition"
                    >
                        <FiRefreshCw size={16} />
                    </TooltipButton>)}


                    {showEdit && (<TooltipButton
                        label="Edit Resume"
                        onClick={onEdit}
                        className="hover:text-cyan-300 transition"
                    >
                        <FiEdit size={16} />
                    </TooltipButton>)}

                    {showTypography && (
                        <TooltipButton
                            label="Typography"
                            onClick={onTypography}
                            className="hover:text-cyan-300 transition"
                        >
                            <FiType size={16} />
                        </TooltipButton>)}

                    {showTemplate && (
                        <TooltipButton
                            label="Change Template"
                            onClick={onChangeTemplate}
                            className="hover:text-cyan-300 transition"
                        >
                            <FiLayout size={16} />
                        </TooltipButton>
                    )}

                    {showColor && (<TooltipButton
                        label="Change Color"
                        onClick={onColorChange}
                        className="hover:text-cyan-300 transition"
                    >
                        <MdColorLens size={16} />
                    </TooltipButton>)}
                </div>

                {showDownload && (
                    <div className="relative group">
                        <button className="ml-4 flex items-center gap-2 rounded-full border-2 border-cyan-400 px-4 py-1 text-white"
                            onClick={() => setOpenDropdown(!openDropdown)}
                        >
                            <FiChevronDown
                                size={16}
                                className={`transition-transform ${openDropdown ? "rotate-180" : ""
                                    }`}
                            />
                            <span className="text-sm">Download</span>
                        </button>
                        {openDropdown && (
                            <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border min-w-[180px] z-50">
                                <button onClick={onDownloadPdf}
                                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left">
                                    <FiFile className="text-red-500" />
                                    PDF
                                </button>
                                {showDocx && (
                                    <button onClick={onDownloadDocx}
                                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left"
                                    >
                                        <FiFile className="text-blue-500" />
                                        DOCX
                                    </button>
                                )}

                                <button onClick={onDownloadPng}
                                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left"
                                >
                                    <FiFile className="text-green-500" />
                                    PNG Image
                                </button>

                                <button onClick={onDownloadJson}
                                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left"
                                >
                                    <FiFileText className="text-yellow-500" />
                                    JSON
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* {showEdit && (

                <button
                    className="ml-4 flex items-center gap-2 rounded-full border-2 border-cyan-400 px-4 py-1 text-white hover:bg-cyan-500 hover:border-cyan-500 transition"
                    onClick={onEdit}
                >
                    <FiEdit size={14} />
                    <span className="text-sm">Edit</span>
                </button>
                )} */}
                {showPreview && (
                    <button
                        onClick={onPreview}
                        className="ml-4 flex items-center gap-2 rounded-full border-2 border-cyan-400 px-4 py-1 text-white hover:bg-cyan-500 hover:border-cyan-500 transition"
                    >
                        <FiEye size={14} />
                        <span className="text-sm">Preview</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ResumeToolbar;