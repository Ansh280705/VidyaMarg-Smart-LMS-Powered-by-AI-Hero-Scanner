export default function DownloadsPage(){
  const files = [
    {name: "Demo Notes.txt", url: "/downloads/sample.txt"},
  ];
  return <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Downloads</h2>
    <ul className="space-y-3">{files.map(f => <li key={f.url}><a className="underline" href={f.url} download>{f.name}</a></li>)}</ul>
  </div>;
}
