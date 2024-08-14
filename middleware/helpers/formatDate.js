module.exports.formatDate = function (dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

module.exports.formatDateBd = function (dateString) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1);
  return date.toLocaleDateString('pt-BR');
};

module.exports.isDateGreater = function (date1, date2) {
  // Converter as datas para objetos Date
  const parsedDate1 = new Date(date1); // "2024-08-16"
  const parsedDate2 = new Date(date2); // "2024-08-14T16:41:14.937Z"

  // Comparar as datas
  return parsedDate2 > parsedDate1;
};

module.exports.isDateEqual = function (date1, date2) {
  // Converter ambos os parâmetros para strings no formato "YYYY-MM-DD"
  const datePart1 =
    date1 instanceof Date
      ? date1.toISOString().split('T')[0]
      : date1.split('T')[0];

  const datePart2 =
    date2 instanceof Date
      ? date2.toISOString().split('T')[0]
      : date2.split('T')[0];

  // Comparar as datas (considerando apenas ano, mês e dia)
  return datePart1 === datePart2;
};
