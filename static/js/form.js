function submit_new_seed() {
    const raw_input = document.getElementById("new_seed_input").value;
    const seed = Number.parseInt(raw_input);
    fetch("/seed", { method: "PUT", body: JSON.stringify({ seed }) })
        .then(() => {
            window.location.reload();
        })
        .catch(() => {
            alert("Something went wrong!");
        });
}
