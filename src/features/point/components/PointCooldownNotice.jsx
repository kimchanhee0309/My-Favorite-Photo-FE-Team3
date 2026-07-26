export default function PointCooldownNotice({ leftTimeFormatted, className }) {
  if (!leftTimeFormatted) return null;

  return (
    <div className={className}>
      <span className="text-gray-300">다음 기회까지 남은 시간</span>
      <span className="text-main">{leftTimeFormatted}</span>
    </div>
  );
}
