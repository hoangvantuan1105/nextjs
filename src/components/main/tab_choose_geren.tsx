export default function Tab_choose_geren({
  onSelectGeren,
  className,
  children,
}) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onSelectGeren && onSelectGeren(e);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
