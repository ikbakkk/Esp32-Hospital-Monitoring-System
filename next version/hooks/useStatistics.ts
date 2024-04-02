interface Statistics {
  maxData: number;
  avgData: number;
  minData: number;
}

const useStatistics = (data: number[]): Statistics => {
  const statistics = (data: number[]) => {
    if (data === undefined) {
      return { maxData: 0, avgData: 0, minData: 0 };
    }

    const maxData = Math.max(...data);
    const minData = Math.min(...data);
    const sum = data.reduce((acc, curr) => acc + curr, 0);
    const avgData = parseFloat((sum / data.length).toFixed(2));

    return { maxData, avgData, minData };
  };

  return statistics(data);
};

export default useStatistics;
