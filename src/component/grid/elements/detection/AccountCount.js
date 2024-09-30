// import * as S from "./AccountCount_style";
// import { useState, useRef, useEffect } from "react";
import useElasticSearch from "../../../hook/Hook";
import React from "react";

const ElasticPage = () => {
  // ElasticSearch에서 데이터를 가져오기 위해 인덱스 이름과 쿼리 정의
  const indexName = "test-index"; // 사용할 인덱스 이름
  const query = {
    match_all: {},
  };

  // Hook을 통해 데이터를 가져옴
  const { data, loading, error } = useElasticSearch(indexName, query);

  // 로딩 중일 때 표시할 내용
  if (loading) return <div>Loading data...</div>;

  // 에러 발생 시 표시할 내용
  if (error) return <div>Error loading data: {error.message}</div>;

  // 데이터를 화면에 출력
  return (
    <div>
      <h1>ElasticSearch Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ElasticPage;
