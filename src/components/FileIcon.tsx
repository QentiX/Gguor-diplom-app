const FileIcon = ({ type }: { type: string }) => {
  // Приводим тип файла к нижнему регистру для унификации
  const fileType = type.toLowerCase();
  
  // Определяем иконку по типу файла
  const getIcon = () => {
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('video')) return '🎬';
    if (fileType.includes('audio')) return '🔊';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('doc')) return '📝';
    if (fileType.includes('excel') || fileType.includes('xls')) return '📊';
    if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
    return '📌'; // Иконка по умолчанию
  };

  return <span className="text-sm">{getIcon()}</span>;
};

export default FileIcon