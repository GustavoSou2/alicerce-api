// src/documents/documents.controller.ts
import { Controller, Post, Body, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { DocumentsService } from "src/modules/documents/service/documents/documents.service";

@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  // Rota para salvar o documento
  @Post("upload")
  async uploadDocument(
    @Body()
    body: {
      fileName: string;
      extension: string;
      size: number;
      base64: string;
    },
  ) {
    return this.documentsService.saveDocument(body);
  }

  // Rota para gerar e baixar o arquivo
  @Get(":id/generate")
  async generateDocument(@Param("id") id: number, @Res() res: Response) {
    // Gerando o arquivo
    const filePath = await this.documentsService.generateDocumentFile(id);

    // Enviando o arquivo como resposta para download
    res.download(filePath, (err) => {
      if (err) {
        res.status(500).send("Erro ao gerar o arquivo");
      }
    });
  }
}
