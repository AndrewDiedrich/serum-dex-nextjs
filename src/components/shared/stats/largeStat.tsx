const LargeStat = ({ title, data }: { title: string; data: number }) => (
  <div className="flex-column large-stat">
    <div className="flex-row">{title}</div>
    <div className="flex-row">
      <div className="stat">{data}</div>
    </div>
  </div>
);

export default LargeStat;
