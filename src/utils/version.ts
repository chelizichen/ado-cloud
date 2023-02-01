export let version_num = [
  0,1,2,3,4,5,6,7,8,9
]

export let version_char = [
  "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
  "a", "s", "d", "f", "g", "h", "j", "k", "l",
  "z", "x", "c", "v", "b", "n", "m"
]


export function rename_version(tgzName: string) {
  let len = tgzName.length;
  let version = tgzName.substring(len - 3, len - 1);
  let tgz = tgzName.substring(0,len - 3);
  let new_version = ""
  let new_tgz = ""
  if (version[1] == version_char[version_char.length-1]) {
    new_version = String(Number(version[0]) + 1) + version_char[0]
    new_tgz = tgz + new_version
    return new_tgz
  } else {
    let index = version_char.indexOf(version[1])
    new_version = version[0] + version_char[index];
    new_tgz = tgz + new_version;
    return new_tgz
  }
}