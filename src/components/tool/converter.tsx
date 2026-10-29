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
import { fill } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";
import { RemoveBgTool } from "@/components/remove-bg/remove-bg-tool";
import { InvoiceTool } from "@/components/invoice/invoice-tool";

export const Converter = ({ slug }: { slug: string }) => {
  const tool = getTool(slug)!;
  if (tool.kind === "remove-bg") return <RemoveBgTool />;
  if (tool.kind === "invoice") return <InvoiceTool />;
  return <FileConverter slug={slug} />;
};

const FileConverter = ({ slug }: { slug: string }) => {
  const tool = getTool(slug)!;
  const { ui } = useLocale();
  const text = ui.converter;
  const converter = useConverter(tool, text, ui.errors);
  const { items } = converter;
  const fromLabel = tool.from.length > 2 ? text.images : fill(text.files, { format: FORMATS[tool.from[0]].label });
  const doneCount = items.filter((item) => item.output).length;

  return (
    <div className="flex flex-col gap-4">
      <Dropzone
        accept={formatAccept(tool.from)}
        label={fill(items.length ? text.addMore : text.choose, { files: fromLabel })}
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
                {fill(text.downloadPdf, { count: items.length, pages: items.length === 1 ? text.page : text.pages })}
              </Button>
            ) : (
              <Button size="lg" onClick={converter.downloadAll} disabled={!doneCount || converter.busy}>
                {converter.busy ? <Loader2 className="animate-spin" /> : <Download />}
                {doneCount > 1 ? fill(text.downloadAll, { count: doneCount }) : text.download}
              </Button>
            )}
            <Button size="lg" variant="ghost" onClick={converter.clear}>
              <Trash2 />
              {text.clear}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
