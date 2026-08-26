import { GeminiThinkingLevel, Model, OpenAiReasoningEffort } from "./model.types";
import { PromptVariant } from "./prompt.types";
import { LanguageCode, TaskTypeId } from "../../assets/config/prompts";

export interface RequestSettings {
  model: Model;
  language?: LanguageCode;
  taskType: TaskTypeId;
  temperature: number | null;
  reasoningEffort: OpenAiReasoningEffort | null;
  thinkingLevel: GeminiThinkingLevel | null;
  descriptionLength: number;
  promptVariant: PromptVariant;
  includeFilename: boolean;
  teiEncode: boolean;
  batchSize: number;
  tablePreserveBlankCells?: boolean;
  tablePreserveMergedCells?: boolean;
  tableMarkUnclearText?: boolean;
  tableExportGrouping?: 'combined' | 'separate';
  tableTranslationLanguage?: 'original' | LanguageCode;
  transcriptionTranslationLanguage?: 'original' | LanguageCode;
};
