/** @format */

// BlockToken BlockSales

export default function deploymentConfig() {
  const deployCue: string[] = ["BlockSales"];

  const updateCue = (deployedContract: string) => {
    let i = deployCue.indexOf(deployedContract);
    let total = deployCue.length;

    if (i < total - 1) {
      deployCue[i] = deployCue[deployCue.length - 1];
    }
    deployCue.pop();
  };

  return { deployCue, updateCue };
}
