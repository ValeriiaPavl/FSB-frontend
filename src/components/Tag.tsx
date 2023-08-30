import { z } from "zod";

const tagValidator = z.string();
export type TagType = z.infer<typeof tagValidator>;

export interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => {
  return (
    <div className="tag">
      <p>{tag}</p>
    </div>
  );
};

export default Tag;
