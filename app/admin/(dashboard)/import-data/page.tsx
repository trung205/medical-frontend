"use client";
import React, { useState, useRef } from "react";
import { toast } from "@/hooks/use-toast";

const URL_API = process.env.NEXT_PUBLIC_API_URL;
export default function UploadPage() {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const CHUNK_SIZE = 5 * 1024 * 1024;

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const fileId = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;

    console.log(`Bắt đầu upload file: ${file.name} (fileId: ${fileId})`);
    console.log(`Tổng số chunk: ${totalChunks}`);

    try {
      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(file.size, start + CHUNK_SIZE);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append("chunk", chunk);

        const url = `${URL_API}/import/chunk?fileId=${encodeURIComponent(
          fileId
        )}&index=${i}`;

        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          toast({
            variant: "destructive",
            title: "Lỗi",
            description: `Upload chunk ${i} thất bại: ${await response.text()}`,
          });
        }

        const newProgress = Math.round(((i + 1) / totalChunks) * 100);
        console.log(
          `Đã upload chunk ${i}/${totalChunks - 1} - Tiến độ: ${newProgress}%`
        );
        setProgress(newProgress);
      }

      console.log("Đang gọi endpoint /complete để ghép file...");
      const completeResponse = await fetch(`${URL_API}/import/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId, filename: file.name }),
      });

      if (!completeResponse.ok) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: `Ghép file thất bại: ${await completeResponse.text()}`,
        });
      }

      toast({
        title: "Thành công",
        description: `✅ Upload hoàn tất! File đang được xử lý.`,
      });
    } catch (error: any) {
      console.error("Lỗi trong quá trình upload:", error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: `Upload thất bại: ${error.message}`,
      });
      setProgress(0);
      setSelectedFileName(null);
    } finally {
      setIsUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(0);

    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name); // Hiển thị tên file mới ngay lập tức
      uploadFile(file);
    } else {
      setSelectedFileName(null);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        {/* ... (phần h2 và div kéo thả không đổi) ... */}

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-6 mb-6 text-center hover:border-blue-500 transition-colors duration-200 cursor-pointer">
          <input
            ref={fileInputRef} // 5. Gắn ref vào input
            id="file-upload"
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center cursor-pointer"
          >
            {/* ... (phần UI bên trong label không đổi) ... */}
            {!isUploading && !selectedFileName && (
              <>
                <svg
                  className="w-16 h-16 text-blue-500 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="text-lg text-blue-700 font-semibold">
                  Kéo & Thả file Excel vào đây
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  hoặc{" "}
                  <span className="text-blue-600 underline">
                    nhấn để chọn file
                  </span>
                </p>
              </>
            )}

            {selectedFileName && (
              <div className="flex items-center text-blue-600 font-medium">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <span>{selectedFileName}</span>
              </div>
            )}

            {isUploading && (
              <p className="text-blue-500 mt-2">Đang tải lên...</p>
            )}
          </label>
        </div>

        {/* ... (phần thanh progress và thông báo không đổi) ... */}
        {isUploading && progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
              <span>Tiến độ</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Logic này giờ đã đúng:
          - Khi thành công, isUploading=false, selectedFileName=true, progress=100
          - Khi thất bại, isUploading=false, selectedFileName=null
        */}
        {!isUploading && selectedFileName && progress === 100 && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
            Upload hoàn tất! File đang được xử lý.
          </div>
        )}

        {!isUploading && selectedFileName && progress < 100 && progress > 0 && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
            Upload thất bại hoặc bị hủy. Vui lòng thử lại.
          </div>
        )}
      </div>
    </div>
  );
}
