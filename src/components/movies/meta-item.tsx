import { LucideIcon } from "lucide-react";

function MetaItem({title, value,Icon}:{title:string,value:string|number,Icon?:LucideIcon}) {
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <span className="uppercase">{title}</span>
      <div>
        {
            Icon && <Icon className="text-yellow-400 inline-block mr-2" />
        }
        <span>{value}</span>
      </div>
    </div>
  );
}

export default MetaItem;
