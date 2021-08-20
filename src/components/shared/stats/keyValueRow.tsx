const KeyValueRow = ({
  marginLeft,
  fill,
  title,
  data,
}: {
  marginLeft?: number;
  fill?: boolean;
  title: string;
  data: number;
}) => (
  <div className={`flex-row mb-2 ${marginLeft ? `ml-${marginLeft}` : null} key-value-row${fill ? '-fill' : null}`}>
    <div className="flex-column">{title}:</div>
    <div className="flex-column bold">{data}</div>
  </div>
);

export default KeyValueRow;
