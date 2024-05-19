export function postItem(uuid: string, json: string) {
  localStorage.setItem(uuid, json);
}

export function getItem(uuid: string) {
  localStorage.getItem(uuid);
}

export function editItem(uuid: string, json: string) {
  localStorage.setItem(uuid, json);
}

export function deleteItem(uuid: string, json: string) {
  localStorage.removeItem(uuid);
}
