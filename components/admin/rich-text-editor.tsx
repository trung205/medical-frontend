"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { ResizableImage } from "tiptap-extension-resizable-image";

import { Table as TableIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  ImageIcon,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadEditorImage } from "@/services/admin/imageService";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const LINK_API_URL = process.env.NEXT_PUBLIC_API_URL;

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rowsCount, setRowsCount] = useState(3);
  const [colsCount, setColsCount] = useState(3);

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      ResizableImage.configure({
        defaultWidth: 200,
        defaultHeight: 200,
      
        async onUpload(file: File) {
           const uploadedUrl = await uploadFileToStorage(file);

          if (uploadedUrl) {
            return {
              src: LINK_API_URL + uploadedUrl,
            };
          }

          throw new Error("Tải ảnh lên server thất bại.");
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[400px] p-4 focus:outline-none border border-input rounded-md bg-background",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      setTimeout(() => {
        editor.commands.setContent(value);
        editor.commands.resetAttributes('img', ['data-keep-ratio'])
      }, 0);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const insertCustomTable = () => {
    const rows = rowsCount > 0 ? rowsCount : 3;
    const cols = colsCount > 0 ? colsCount : 3;

    if (editor && rows > 0 && cols > 0) {
      editor
        .chain()
        .focus()
        .insertTable({ rows: rows, cols: cols, withHeaderRow: true })
        .run();
    }
    setIsDialogOpen(false);
  };

  const openInsertTableDialog = () => {
    setRowsCount(3);
    setColsCount(3);
    setIsDialogOpen(true);
  };

  const openLinkDialog = () => {
    const currentLink = editor?.getAttributes("link").href || "";
    setLinkUrl(currentLink);
    setIsLinkDialogOpen(true);
  };

  const addLinkFromUrl = () => {
    if (!editor) return;

    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }

    setLinkUrl("");
    setIsLinkDialogOpen(false);
  };

  async function uploadFileToStorage(file: File): Promise<string | null> {
    try {
      const response = await uploadEditorImage(file);
      console.log("uploadFileToStorage response:", response);
      if (response.success) {
        return response.data.url;
      } else {
        throw new Error(response.message || "Upload thất bại.");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const openImageDialog = () => {
    setImageUrl("");
    setSelectedFile(null);
    setIsImageDialogOpen(true);
  };

  const handleInsertImage = async () => {
    if (!editor) return;

    if (!imageUrl && !selectedFile) {
      setUploadError("Vui lòng nhập URL hoặc chọn một file để chèn.");
      return;
    }

    setIsUploading(true);

    try {
      let finalSrc = "";
      setUploadError(null);

      if (selectedFile) {
        const uploadedUrl = await uploadFileToStorage(selectedFile);

        if (!uploadedUrl) {
          setUploadError("Tải ảnh lên server thất bại. Vui lòng thử lại.");
          return;
        }
        finalSrc = LINK_API_URL + uploadedUrl;
      } else if (imageUrl) {
        finalSrc = imageUrl;
      }

      if (finalSrc) {
        editor.chain().focus().setImage({ src: finalSrc }).run();

        setImageUrl("");
        setSelectedFile(null);
        setIsImageDialogOpen(false);
      }
    } catch (e) {
      setUploadError("Đã xảy ra lỗi không mong muốn trong quá trình xử lý.");
      console.error(e);
    } finally {
      setIsUploading(false); 
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="bg-muted/50 border-b border-border p-2 flex flex-wrap gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted" : ""}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted" : ""}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "bg-muted" : ""}
        >
          <UnderlineIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-muted" : ""}
        >
          <Strikethrough className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "bg-muted" : ""}
        >
          <Code className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""}
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""}
        >
          <Heading2 className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-muted" : ""}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-muted" : ""}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "bg-muted" : ""}
        >
          <Quote className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "bg-muted" : ""}
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "bg-muted" : ""}
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "bg-muted" : ""}
        >
          <AlignRight className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" }) ? "bg-muted" : ""
          }
        >
          <AlignJustify className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={openImageDialog}
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={openLinkDialog}
        >
          <Link2 className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={openInsertTableDialog}
        >
          <TableIcon className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.isActive("table")}
        >
          Xóa Bảng
        </Button>

        <div className="w-px h-6 bg-border mx-1" />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tạo Bảng Mới</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rows" className="text-right">
                Số Hàng
              </Label>
              <Input
                id="rows"
                type="number"
                min="1"
                value={rowsCount}
                onChange={(e) => setRowsCount(parseInt(e.target.value) || 1)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cols" className="text-right">
                Số Cột
              </Label>
              <Input
                id="cols"
                type="number"
                min="1"
                value={colsCount}
                onChange={(e) => setColsCount(parseInt(e.target.value) || 1)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={insertCustomTable}>
              Tạo Bảng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chèn Hình Ảnh</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="fileInput">Tải Ảnh Lên</Label>
            <Input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setSelectedFile(e.target.files?.[0] || null);
                setImageUrl(""); 
                setUploadError(null);
              }}
              className="col-span-3"
              disabled={isUploading}
            />

            <div className="flex items-center space-x-2">
              <div className="flex-grow border-t border-border" />
              <span className="text-xs text-muted-foreground">HOẶC</span>
              <div className="flex-grow border-t border-border" />
            </div>

            {/* INPUT URL */}
            <Label htmlFor="imageUrl">URL Hình Ảnh</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setSelectedFile(null);
                setUploadError(null);
              }}
              disabled={isUploading || !!selectedFile}
            />

            {uploadError && (
              <p className="text-sm text-red-500">{uploadError}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={handleInsertImage}
              disabled={isUploading || (!imageUrl && !selectedFile)}
            >
              {isUploading ? "Đang tải..." : "Chèn Ảnh"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chèn/Chỉnh Sửa Liên Kết</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="linkUrl">URL Liên Kết</Label>
            <Input
              id="linkUrl"
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addLinkFromUrl();
              }}
            />
          </div>
          <DialogFooter>
            <Button type="button" onClick={addLinkFromUrl}>
              {editor?.isActive("link") && linkUrl ? "Cập nhật" : "Chèn Link"}
            </Button>
            {editor?.isActive("link") && (
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  editor?.chain().focus().unsetLink().run() &&
                  setIsLinkDialogOpen(false)
                }
              >
                Xóa Link
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <EditorContent editor={editor} />
    </div>
  );
}
