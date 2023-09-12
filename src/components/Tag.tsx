import { z } from "zod";
import { Badge } from "./ui/badge";

const tagValidator = z.string();
export type TagType = z.infer<typeof tagValidator>;

export interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => {
  return (
    <Badge className="tag">
      <p>{tag}</p>
    </Badge>
  );
};

export default Tag;
