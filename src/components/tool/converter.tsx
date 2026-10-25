"use client";

import { Download, FileText, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatAccept } from "@/data/formats";
import { getTool } from "@/data/tools";
import { useConverter } from "@/hooks/use-converter";
import { Dropzone } from "@/components/tool/dropzone";
import { FileRow } from "@/components/tool/file-row";
import { OptionsBar } from "@/components/tool/options-bar";
import { FORMATS } from "@/data/formats";

export const Converter = ({ slug }: { slug: string }) => {
  const tool = getTool(slug)!;
  const converter = useConverter(tool);
  const { items } = converter;
  const fromLabel = tool.from.length > 2 ? "images" : `${FORMATS[tool.from[0]].label} files`;
  const doneCount = items.filter((item) => item.output).length;

  return (
    <div className="flex flex-col gap-4">
      <Dropzone
        accept={formatAccept(tool.from)}
        label={items.length ? `Add more ${fromLabel}` : `Choose ${fromLabel}`}
        compact={items.length > 0}
        onFiles={converter.addFiles}
      />
      {items.length > 0 && (
        <>
          <OptionsBar tool={tool} options={converter.options} onChange={converter.reconvertAll} />
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <FileRow key={item.id} item={item} onRemove={converter.remove} />
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-2">
            {tool.kind === "to-pdf" ? (
              <Button size="lg" onClick={converter.makePdf} disabled={converter.busy}>
                {converter.busy ? <Loader2 className="animate-spin" /> : <FileText />}
                Download PDF ({items.length} {items.length === 1 ? "page" : "pages"})
              </Button>
            ) : (
              <Button size="lg" onClick={converter.downloadAll} disabled={!doneCount || converter.busy}>
                {converter.busy ? <Loader2 className="animate-spin" /> : <Download />}
                {doneCount > 1 ? `Download all (${doneCount}) as ZIP` : "Download"}
              </Button>
            )}
            <Button size="lg" variant="ghost" onClick={converter.clear}>
              <Trash2 />
              Clear
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
