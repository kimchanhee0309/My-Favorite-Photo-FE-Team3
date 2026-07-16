import { gradeColorMap } from './gradeColorMap';

const sizeClassMap = {
  S: 'typo-10-regular',
  L: 'typo-16-regular',
};

function resolveSizeClass(size) {
  if (typeof size === 'string') {
    return sizeClassMap[size];
  }

  const { base, md, lg } = size;
  return [
    sizeClassMap[base],
    md ? `md:${sizeClassMap[md]}` : '',
    lg ? `lg:${sizeClassMap[lg]}` : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export default function GradeCard({ grade, size = 'L', className = '' }) {
  const sizeClass = resolveSizeClass(size);

  return (
    <span className={`${sizeClass} ${gradeColorMap[grade]} ${className}`}>
      {grade}
    </span>
  );
}