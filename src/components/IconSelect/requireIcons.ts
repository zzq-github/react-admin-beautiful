
// 扫描该目录下所有的 .svg 文件
const modules = import.meta.glob('../../assets/icons/svg/*.svg');

const icons = Object.keys(modules).map((key) => {
  // key 的格式类似于: "../../assets/icons/svg/user.svg"
  // 我们需要提取出 "user" 作为图标名称
  const pathParts = key.split('/');
  const fileName = pathParts[pathParts.length - 1];
  return fileName.replace('.svg', '');
});

export default icons;