'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { CloudUpload } from 'lucide-react';
import Image from 'next/image';

interface CloudinaryUploadProps {
    onUpload: (url: string) => void;
    currentImage?: string;
}

export default function CloudinaryUpload({ onUpload, currentImage }: CloudinaryUploadProps) {
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!uploadPreset) {
        return (
            <div className="p-4 border border-destructive/50 rounded-md bg-destructive/10 text-destructive text-sm">
                Missing NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET env var.
            </div>
        );
    }

    return (
        <div>
            <CldUploadWidget
                uploadPreset={uploadPreset}
                onSuccess={(result: any) => {
                    if (result.info?.secure_url) {
                        onUpload(result.info.secure_url);
                    }
                }}
            >
                {({ open }) => {
                    return (
                        <div
                            className="border-2 border-dashed border-input hover:border-primary hover:bg-muted/50 transition-colors rounded-lg p-6 text-center cursor-pointer flex flex-col items-center justify-center gap-2"
                            onClick={() => open()}
                        >
                            {currentImage ? (
                                <div className="relative h-[200px] w-full mb-2 overflow-hidden rounded-md">
                                    <Image
                                        src={currentImage}
                                        alt="Cover Image"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            ) : (
                                <CloudUpload className="h-12 w-12 text-muted-foreground mb-1" />
                            )}
                            <div className="text-sm font-medium">
                                {currentImage ? 'Click to Change Image' : 'Click to Upload Cover Image'}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Supports JPG, PNG, WEBP
                            </div>
                        </div>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}
