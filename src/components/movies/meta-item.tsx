import { LucideIcon } from "lucide-react";

function MetaItem({title, value,Icon}:{title:string,value:string|number,Icon?:LucideIcon}) {
  return (
    <div className="flex flex-col justify-center items-center space-y-1">
      <span className="uppercase text-primary-content">{title}</span>
      <div>
        {
            Icon && <Icon className="text-yellow-400 inline-block mr-2" />
        }
        <span className="">{value}</span>
      </div>
    </div>
  );
}

export default MetaItem;
