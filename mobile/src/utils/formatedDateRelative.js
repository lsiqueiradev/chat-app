import { parseISO, format, formatRelative } from 'date-fns';

import ptBR from 'date-fns/locale/pt-BR';

export default function formatedDateRelative(data) {
  const date = parseISO(data);
  const dateNow = new Date();

  const formatRelativeLocale = {
    lastWeek: 'eee',
    yesterday: "'Ontem'",
    today: 'HH:mm',
    other: 'dd/MM/yyyy',
  };

  const locale = {
    ...ptBR,
    formatRelative: (token) => formatRelativeLocale[token],
  };

  const formattedDate = formatRelative(date, dateNow, { locale });

  return formattedDate
    .substring(0, 1)
    .toUpperCase()
    .concat(formattedDate.substring(1));
}
