export default function convertToFloat(item: string): number {
  return parseFloat(item.replace('R$', '').replace('.', '').replace(',', '.'))
}
