export async function getUpdates() {
  return new Promise((resolve, reject) => {
    Utils.execAsync(["bash", "-c", "dnf -q list --updates"])
      .then((output) => {
        const lines = output.trim().split("\n").slice(1);
        const packages = [];
        lines.forEach((line) => {
          const parts = line.split(/\s+/);
          const packageName = parts[0];
          const packageVersion = parts[1];
          const packageRepository = parts[2];

          if (packageName !== "") {
            packages.push({
              name: packageName,
              version: packageVersion,
              repository: packageRepository,
            });
          }
        });
        resolve(JSON.stringify(packages, null, 2));
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function getPackageInfo(package_name) {
  return new Promise((resolve, reject) => {
    Utils.execAsync(["bash", "-c", `dnf -q info --upgrades ${package_name}`])
      .then((output) => {
        const packages = output.split(/\n\n/)[0];

        const lines = packages.split("\n").slice(1);

        const package_name = lines[0].split(": ")[1];
        const version = lines[1].split(": ")[1];
        const size = lines[4].split(": ")[1];
        let descr = lines[10].split(": ")[1];
        for (let i = 11; i < lines.length; i++) {
          descr += lines[i].trim() + " ";
        }

        descr = descr.replace(/[\n\t:]/g, "").trim();

        const result = {
          name: package_name,
          version: version,
          size: size,
          description: descr,
        };
        resolve(JSON.stringify(result, null, 2));
      })
      .catch((err) => {
        reject(err);
      });
  });
}
