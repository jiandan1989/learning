import { useMemo } from 'react';
import { useAsync } from '@umijs/hooks';

const useQueryData = (queryService: (...args) => Promise<any>, defaultData: any = { list: [], total: 0 }) => {
  const { data, run: queryData, loading } = useAsync(queryService, [], {
    manual: true,
  });

  const result = useMemo(() => {
    // 此处可以添加自己业务中使用到的判断防范
    if (data && data.success) {
      return data.data || defaultData;
    }
    return defaultData;
  }, [data]);

  return { result, loading, queryData };
};

export default useQueryData;
