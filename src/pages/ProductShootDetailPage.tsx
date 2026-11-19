import React from "react";
import { Project } from "@/data/projects";
import { UniversalWorkCinemaPage } from "@/pages/WorkDetailPage";

export interface ProductShootDetailPageProps {
  project: Project;
  nextProject: Project;
  onInquirySubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inquiry: { name: string; email: string; phone: string; message: string };
  setInquiry: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; phone: string; message: string }>
  >;
  isSubmittingInquiry: boolean;
  inquirySubmitted: boolean;
  inquiryError: string | null;
  setInquirySubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductShootDetailPage(props: ProductShootDetailPageProps) {
  return <UniversalWorkCinemaPage {...props} />;
}
