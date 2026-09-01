// // import { NarratorCard } from "@/components/NarratorCard";
// // import { Pagination } from "@/components/Pagination";
// // import { EmptyState, ErrorState } from "@/components/States";
// // import { getNarrators } from "@/lib/queries";

// // export const dynamic = "force-dynamic";

// // export default async function NarratorsPage({
// //   searchParams,
// // }: {
// //   searchParams: Promise<{ page?: string }>;
// // }) {
// //   const params = await searchParams;
// //   const page = Number(params.page ?? "1") || 1;
// //   const result = await getNarrators(page);

// //   return (
// //     <section>
// //       <div className="pagehead">
// //         <div className="shell">
// //           <div className="eyebrow">Narrators</div>
// //           <h1 className="title">Verified narrator profiles</h1>
// //           <p>Identity records remain separate from chain names until a reviewer attaches them.</p>
// //         </div>
// //       </div>
// //       <div className="shell">
// //         {result.error ? <ErrorState message={result.error.message} /> : null}
// //         {!result.narrators.length ? (
// //           <EmptyState message="No verified narrators are public yet." />
// //         ) : (
// //           <div className="cards">
// //             {result.narrators.map((narrator) => (
// //               <NarratorCard key={narrator.id} narrator={narrator} />
// //             ))}
// //           </div>
// //         )}
// //         <Pagination
// //           page={result.page}
// //           pageSize={result.pageSize}
// //           total={result.total}
// //           hrefFor={(next) => `/narrators?page=${next}`}
// //         />
// //       </div>
// //     </section>
// //   );
// // }
// import { NarratorCard } from "@/components/NarratorCard";
// import { Pagination } from "@/components/Pagination";
// import { EmptyState, ErrorState } from "@/components/States";
// import { getNarrators } from "@/lib/queries";

// export const dynamic = "force-dynamic";

// export default async function NarratorsPage({
//   searchParams,
// }: {
//   searchParams: Promise<{ page?: string }>;
// }) {
//   const params = await searchParams;
//   const page = Number(params.page ?? "1") || 1;
//   const result = await getNarrators(page);

//   return (
//     <section>
//       <div className="pagehead">
//         <div className="shell">
//           <div className="eyebrow">Narrators</div>
//           <h1 className="title">Verified narrator profiles</h1>
//           <p>Identity records remain separate from chain names until a reviewer attaches them.</p>
//         </div>
//       </div>
//       <div className="shell">
//         {result?.error ? <ErrorState message={typeof result.error === 'object' && result.error !== null && 'message' in result.error ? (result.error as any).message : "An error occurred"} /> : null}
//         {!result?.narrators?.length ? (
//           <EmptyState message="No verified narrators are public yet." />
//         ) : (
//           <div className="cards">
//             {result.narrators.map((narrator) => (
//               <NarratorCard key={narrator.id} narrator={narrator} />
//             ))}
//           </div>
//         )}
//         <Pagination
//           page={result?.page ?? page}
//           pageSize={result?.pageSize ?? 10}
//           total={result?.total ?? 0}
//           hrefFor={(next) => `/narrators?page=${next}`}
//         />
//       </div>
//     </section>
//   );
// }

import { NarratorCard } from "@/components/NarratorCard";
import { Pagination } from "@/components/Pagination";
import { EmptyState, ErrorState } from "@/components/States";
import { getNarrators } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function NarratorsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? "1") || 1;
  const result: any = await getNarrators(page);

  return (
    <section>
      <div className="pagehead">
        <div className="shell">
          <div className="eyebrow">Narrators</div>
          <h1 className="title">Verified narrator profiles</h1>
          <p>Identity records remain separate from chain names until a reviewer attaches them.</p>
        </div>
      </div>
      <div className="shell">
        {result?.error ? <ErrorState message={result.error.message} /> : null}
        {!result?.narrators?.length ? (
          <EmptyState message="No verified narrators are public yet." />
        ) : (
          <div className="cards">
            {result.narrators.map((narrator: any) => (
              <NarratorCard key={narrator.id} narrator={narrator} />
            ))}
          </div>
        )}
        <Pagination
          page={result?.page ?? page}
          pageSize={result?.pageSize ?? 10}
          total={result?.total ?? 0}
          hrefFor={(next) => `/narrators?page=${next}`}
        />
      </div>
    </section>
  );
}