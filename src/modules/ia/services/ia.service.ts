import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class IaService {
  private readonly apiUrl =
    "";
  private readonly apiKey = '';

  async textClassification(text: string): Promise<string> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          inputs: text,
          parameters: {
            candidate_labels: ["materials", "labor", "equipment", "other"],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      return response.data?.labels?.[0]; // retorna a categoria mais provável
    } catch (error) {
      console.error("Erro ao classificar o texto:", error);
      throw new Error("Erro ao classificar o texto");
    }
  }
}
