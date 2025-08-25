"use client";
import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Upload, FileImage, Eye, Layers } from 'lucide-react';

export default function Svgify() {
    return (
        <div className="flex justify-center w-full font-sans">
            <div className="flex flex-col md:w-1/2 md:p-0 p-5">
                <h1 className={`text-5xl font-bold`}>Svgify</h1>
                <p className="pt-3">Upload, customize, and export SVG icons as React/Vue components or CSS backgrounds.</p>
                <div className="flex grid grid-cols-2 gap-8 pt-8">
                    <Card className="h-95">
                        <CardHeader>
                            <CardTitle className="flex items-center pl-1">
                                <Upload className="mr-2" strokeWidth={2} size="20" /> 
                                Upload SVG
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full h-68 rounded-md border-2 border-dashed 
                                hover:border-green-500 duration-100 transition-all cursor-pointer
                                flex flex-col justify-center items-center gap-4">
                                <FileImage strokeWidth={1.75} size="50" />
                                <h1 className="font-bold text-md">Drop your SVG file here</h1>
                                <p className="mb-1">or click to browse</p>
                                <button className="px-2 py-1 bg-green-400 hover:bg-green-500 duration-100
                                rounded-full dark:bg-green-700 dark:hover:bg-green-600 transition-all
                                    text-xs cursor-pointer"
                                        >SVG files only
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="h-95">
                        <CardHeader>
                            <CardTitle className="flex items-center pl-1">
                                <Eye className="mr-2" strokeWidth={2} size="20" /> 
                                Preview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full h-68 rounded-md
                                flex flex-col justify-center items-center gap-4">
                                <Layers strokeWidth={1.75} size="50" />
                                <p className="mb-1">Upload SVG to see preview</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}