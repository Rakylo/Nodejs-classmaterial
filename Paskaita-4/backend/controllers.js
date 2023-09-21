export function test(req, res) {
  res.json({ message: "veikia!" });
}

export function getPerson(req, res) {
  const id = req.params.id;
  console.log(id);

  res.json({ message: "kazkas" });
}

export function getPersonFromGroup(req, res) {
  const { personId, groupId } = req.params;

  console.log(personId, groupId);

  res.json({ personId, groupId });
}
