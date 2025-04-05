import { Template } from "@/domain/models/Template";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "node_modules/@mui/material";

type Props = {
  id: string;
  templates?: Array<Template>;
  selectedTemplateId?: string;
  onTemplateChange: (rowId: string, templateId: string) => void;
};

export const TemplateSelection = ({
  id,
  templates,
  selectedTemplateId,
  onTemplateChange,
}: Props) => {
  const handleSelect = (event: SelectChangeEvent<string>) => {
    const templateId = event.target.value;
    onTemplateChange(id, templateId);
  };

  return (
    <Box p={1}>
      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
        <InputLabel id={`template-select-label-${id}`}>
          Select Template
        </InputLabel>
        <Select
          labelId={`template-select-${id}`}
          id={`template-select-${id}`}
          value={selectedTemplateId ?? ""}
          label="Select Template"
          onChange={handleSelect}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {templates?.map((template) => (
            <MenuItem key={template.id} value={template.id}>
              {template.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
