export async function handler(event: string) {
  console.log('recieved event: ', event);
  return event;
}

export default handler;
