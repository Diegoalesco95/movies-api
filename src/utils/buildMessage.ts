function buildMessage(entity: any, action: string) {
  if (action === 'list') {
    return `${entity}s ${action}ed`;
  }
  return `${entity} ${action}d`;
}

export default buildMessage;
