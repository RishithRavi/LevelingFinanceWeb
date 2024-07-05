export function Logomark(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
      <svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 230.453 230.453"
    xmlSpace="preserve"
    {...props}
  >
    <polygon points="177.169,43.534 177.169,58.534 204.845,58.534 135.896,127.479 92.36,83.947 0,176.312 10.606,186.918  92.361,105.16 135.896,148.691 215.453,69.14 215.453,96.784 230.453,96.784 230.453,43.534 " />
  </svg>
  )
}
export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (<div className="flex items-center w-108 ">
    <svg viewBox="0 0 55 40" aria-hidden="true" {...props}>
      <Logomark width="40" height="40" className="fill-indigo-500" />
    </svg>
    <h1 className="text-xl">Leveling Finance</h1>
  </div>
  
  )
}
