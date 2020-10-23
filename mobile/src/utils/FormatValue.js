export default function FormatValue(value, digits) {
  // let formatador = new Intl.NumberFormat('pt-BR', {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // });

  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: 2,
  });
}
