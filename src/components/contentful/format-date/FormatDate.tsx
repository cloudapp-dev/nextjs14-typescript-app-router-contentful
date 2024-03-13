"use client";
import { useParams, useRouter } from "next/navigation";
const locales = ["en-US", "de-DE"] as const;
type LocaleTypes = (typeof locales)[number];

interface FormatDateProps {
  date: number | Date | undefined;
  locale?: LocaleTypes;
}

export const formatDateFunc = ({ date, locale }: FormatDateProps) => {
  if (!locale || !date) return null;

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
  }).format(new Date(date));
};

export const FormatDate = ({ date, locale }: FormatDateProps) => {
  const { locale: localeFromRouter } = useParams();

  // const locale = useParams()?.locale as LocaleTypes;

  if (!localeFromRouter) return null;

  const selectedLocale = locale || localeFromRouter;

  if (selectedLocale !== "en-US" && selectedLocale !== "de-DE") {
    throw new Error(`Invalid locale: ${selectedLocale}`);
  }

  return <>{formatDateFunc({ date, locale: selectedLocale })}</>;
};
