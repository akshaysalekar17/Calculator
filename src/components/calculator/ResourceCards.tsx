import { ResourceCard } from "../ResourceCard";
import { ResourceState } from "./types";

interface ResourceCardsProps {
  resources: {
    developer: ResourceState;
    designer: ResourceState;
    additional: ResourceState;
  };
  updateResource: (type: keyof typeof resources, updates: Partial<ResourceState>) => void;
}

export function ResourceCards({ resources, updateResource }: ResourceCardsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <ResourceCard
        title="Developer"
        count={resources.developer.count}
        onCountChange={(count) => updateResource("developer", { count })}
        engagement={resources.developer.engagement}
        onEngagementChange={(engagement) =>
          updateResource("developer", { engagement })
        }
        icon={<img src="/lovable-uploads/72072f5f-dbf6-42b3-87c5-de6cf89ec8b8.png" alt="Developer" className="w-[72px] h-[72px]" />}
      />
      <ResourceCard
        title="Designer"
        count={resources.designer.count}
        onCountChange={(count) => updateResource("designer", { count })}
        engagement={resources.designer.engagement}
        onEngagementChange={(engagement) =>
          updateResource("designer", { engagement })
        }
        icon={<img src="/lovable-uploads/b219b666-20ff-4514-a20c-2b833baf9d94.png" alt="Designer" className="w-[72px] h-[72px]" />}
      />
      <ResourceCard
        title="Additional Roles"
        count={resources.additional.count}
        onCountChange={(count) => updateResource("additional", { count })}
        engagement={resources.additional.engagement}
        onEngagementChange={(engagement) =>
          updateResource("additional", { engagement })
        }
        icon={<img src="/lovable-uploads/6dfd7373-98d0-4216-b075-d458d33d61ce.png" alt="Additional Roles" className="w-[72px] h-[72px]" />}
      />
    </div>
  );
}