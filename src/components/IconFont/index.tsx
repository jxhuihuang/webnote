import { IconFont } from '../../utils/utils';
import type { IconFontProps } from '@ant-design/icons/lib/components/IconFont';

export default (props: IconFontProps) => {
  const { type, ...rest } = props;
  const prefix = "icon"
  return <IconFont type={type?.indexOf(prefix) > -1 ? type : `${prefix}-${type}`} {...rest} />
}