'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Box, Button, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image';

interface CloudinaryUploadProps {
    onUpload: (url: string) => void;
    currentImage?: string;
}

export default function CloudinaryUpload({ onUpload, currentImage }: CloudinaryUploadProps) {
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!uploadPreset) {
        return (
            <Box sx={{ p: 2, border: '1px dashed error.main', borderRadius: 1 }}>
                <Typography color="error">
                    Missing NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET env var.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
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
                        <Box
                            sx={{
                                border: '2px dashed #ddd',
                                borderRadius: 2,
                                p: 3,
                                textAlign: 'center',
                                cursor: 'pointer',
                                '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(0,0,0,0.02)' },
                                transition: 'all 0.2s'
                            }}
                            onClick={() => open()}
                        >
                            {currentImage ? (
                                <Box sx={{ position: 'relative', height: 200, width: '100%', mb: 2 }}>
                                    <Image
                                        src={currentImage}
                                        alt="Cover Image"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Box>
                            ) : (
                                <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                            )}
                            <Typography variant="body1" fontWeight={500}>
                                {currentImage ? 'Click to Change Image' : 'Click to Upload Cover Image'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Supports JPG, PNG, WEBP
                            </Typography>
                        </Box>
                    );
                }}
            </CldUploadWidget>
        </Box>
    );
}
