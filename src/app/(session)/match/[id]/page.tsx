"use client";
export default function MatchPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div>Match {id}</div>;
}
