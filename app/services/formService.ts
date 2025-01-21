import axios, { AxiosInstance } from "axios";

const API_BASE_URL = "/api/forms"; 

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "number" | "select" | "textarea" | "checkbox" | "radio";
  required?: boolean;
  options?: string[]; 
  placeholder?: string;
  defaultValue?: string | number | boolean;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  createdAt?: string; 
  updatedAt?: string;
}

class FormService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
    });
  }

  async getForms(): Promise<Form[]> {
    const response = await this.api.get<Form[]>("/");
    return response.data;
  }

  async getFormById(id: string): Promise<Form> {
    const response = await this.api.get<Form>(`/${id}`);
    return response.data;
  }

  async createForm(form: Omit<Form, "id" | "createdAt" | "updatedAt">): Promise<Form> {
    const response = await this.api.post<Form>("/", form);
    return response.data;
  }

  async updateForm(
    id: string,
    updatedForm: Partial<Omit<Form, "id" | "createdAt" | "updatedAt">>
  ): Promise<Form> {
    const response = await this.api.put<Form>(`/${id}`, updatedForm);
    return response.data;
  }

  async deleteForm(id: string): Promise<void> {
    await this.api.delete(`/${id}`);
  }

  async addFieldToForm(formId: string, field: FormField): Promise<Form> {
    const response = await this.api.post<Form>(`/${formId}/fields`, field);
    return response.data;
  }

  async removeFieldFromForm(formId: string, fieldId: string): Promise<Form> {
    const response = await this.api.delete<Form>(`/${formId}/fields/${fieldId}`);
    return response.data;
  }

  async updateFieldInForm(formId: string, fieldId: string, updatedField: Partial<FormField>): Promise<Form> {
    const response = await this.api.put<Form>(`/${formId}/fields/${fieldId}`, updatedField);
    return response.data;
  }
}

export const formService = new FormService(API_BASE_URL);

