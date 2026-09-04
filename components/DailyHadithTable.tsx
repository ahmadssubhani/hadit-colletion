// import React from "react";

// export interface DailyHadithItem {
//   identifier: string;
//   bookTitle: string;
//   hadithNumber: string;
//   chapter: string;
//   arabicPreview: string;
//   englishPreview: string;
//   hadithStatus: string;
//   sourceUrl?: string;
//   tradition?: string;
// }

// export interface DailyHadithTableProps {
//   topicTitle?: string;
//   dayNumber?: number;
//   runDate?: string;
//   remainingInPool?: number;
//   hadiths?: DailyHadithItem[];
// }

// export function DailyHadithTable({
//   topicTitle = "First Wahi",
//   dayNumber = 1,
//   runDate = "",
//   remainingInPool = 0,
//   hadiths = [],
// }: DailyHadithTableProps) {
//   const safeHadiths = Array.isArray(hadiths) ? hadiths : [];

//   return (
//     <div
//       className="card"
//       style={{
//         padding: "24px",
//         marginBottom: "60px",
//         background: "var(--white)",
//         border: "1px solid var(--line)",
//         borderRadius: "var(--r)",
//         boxShadow: "var(--shadow)",
//       }}
//     >
//       {/* Header bar */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexWrap: "wrap",
//           gap: "12px",
//           paddingBottom: "16px",
//           marginBottom: "20px",
//           borderBottom: "1px solid var(--line)",
//         }}
//       >
//         <div>
//           <span
//             className="pill"
//             style={{
//               background: "var(--green2)",
//               color: "var(--green)",
//               fontWeight: 700,
//               fontSize: "12px",
//               padding: "4px 10px",
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "6px",
//             }}
//           >
//             <span
//               style={{
//                 width: "7px",
//                 height: "7px",
//                 borderRadius: "50%",
//                 background: "var(--green)",
//                 display: "inline-block",
//               }}
//             />
//             Auto-rotates daily
//           </span>
//           <h3 style={{ margin: "8px 0 4px", fontSize: "20px", fontWeight: 700 }}>
//             {topicTitle}
//           </h3>
//           <div className="meta" style={{ fontSize: "13px" }}>
//             Day {dayNumber} ({runDate}) • {remainingInPool} candidates remaining in pool
//           </div>
//         </div>
//       </div>

//       {/* Table section */}
//       {safeHadiths.length === 0 ? (
//         <div style={{ textAlign: "center", padding: "30px", color: "var(--muted)" }}>
//           No hadiths available for today&apos;s daily selection.
//         </div>
//       ) : (
//         <div style={{ overflowX: "auto" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
//             <thead>
//               <tr
//                 style={{
//                   borderBottom: "1px solid var(--line)",
//                   background: "#faf7f0",
//                   fontSize: "12px",
//                   fontWeight: 700,
//                   textTransform: "uppercase",
//                   letterSpacing: "0.5px",
//                   color: "var(--muted)",
//                 }}
//               >
//                 <th style={{ padding: "12px 14px", width: "45px", textAlign: "center" }}>#</th>
//                 <th style={{ padding: "12px 14px", width: "180px" }}>Book & Number</th>
//                 <th style={{ padding: "12px 14px", width: "130px" }}>Tradition</th>
//                 <th style={{ padding: "12px 14px" }}>Report Text (Arabic & English)</th>
//                 <th style={{ padding: "12px 14px", width: "100px", textAlign: "center" }}>Grade</th>
//                 <th style={{ padding: "12px 14px", width: "80px", textAlign: "right" }}>Source</th>
//               </tr>
//             </thead>
//             <tbody>
//               {safeHadiths.map((item, idx) => {
//                 const isShia =
//                   item.bookTitle.includes("Kafi") ||
//                   item.bookTitle.includes("Nahj") ||
//                   item.tradition === "Twelver Shia";

//                 return (
//                   <tr
//                     key={item.identifier || idx}
//                     style={{
//                       borderBottom: idx === safeHadiths.length - 1 ? "none" : "1px solid var(--line)",
//                       verticalAlign: "top",
//                     }}
//                   >
//                     {/* Index */}
//                     <td
//                       style={{
//                         padding: "16px 14px",
//                         fontWeight: 700,
//                         textAlign: "center",
//                         color: "var(--muted)",
//                       }}
//                     >
//                       {idx + 1}
//                     </td>

//                     {/* Book & Hadith Number */}
//                     <td style={{ padding: "16px 14px" }}>
//                       <div style={{ fontWeight: 700, color: "var(--ink)" }}>{item.bookTitle}</div>
//                       <div className="meta" style={{ marginTop: "2px", fontSize: "13px" }}>
//                         Hadith #{item.hadithNumber}
//                       </div>
//                       {item.chapter && (
//                         <div
//                           className="meta"
//                           style={{
//                             marginTop: "4px",
//                             fontSize: "12px",
//                             fontStyle: "italic",
//                             color: "#857e72",
//                           }}
//                         >
//                           {item.chapter}
//                         </div>
//                       )}
//                     </td>

//                     {/* Tradition Badge */}
//                     <td style={{ padding: "16px 14px" }}>
//                       <span
//                         className="pill"
//                         style={{
//                           background: isShia ? "#f3e8ff" : "#e0f2fe",
//                           color: isShia ? "#6b21a8" : "#0369a1",
//                           borderColor: isShia ? "#d8b4fe" : "#bae6fd",
//                           fontWeight: 600,
//                           fontSize: "12px",
//                         }}
//                       >
//                         {isShia ? "Twelver Shia" : "Sunni"}
//                       </span>
//                     </td>

//                     {/* Arabic & English Text */}
//                     <td style={{ padding: "16px 14px" }}>
//                       <div
//                         className="arabic"
//                         style={{
//                           fontSize: "20px",
//                           lineHeight: "1.7",
//                           marginBottom: "8px",
//                           color: "var(--ink)",
//                           textAlign: "right",
//                         }}
//                       >
//                         {item.arabicPreview}
//                       </div>
//                       <div
//                         style={{
//                           fontSize: "14px",
//                           lineHeight: "1.6",
//                           color: "var(--ink)",
//                           opacity: 0.9,
//                         }}
//                       >
//                         {item.englishPreview}
//                       </div>
//                     </td>

//                     {/* Status Badge */}
//                     <td style={{ padding: "16px 14px", textAlign: "center" }}>
//                       <span
//                         className="pill"
//                         style={{
//                           background:
//                             item.hadithStatus === "sahih"
//                               ? "var(--green2)"
//                               : item.hadithStatus === "hasan"
//                               ? "#fef3c7"
//                               : "#f3f4f6",
//                           color:
//                             item.hadithStatus === "sahih"
//                               ? "var(--green)"
//                               : item.hadithStatus === "hasan"
//                               ? "#92400e"
//                               : "#4b5563",
//                           fontWeight: 700,
//                           fontSize: "12px",
//                           textTransform: "capitalize",
//                         }}
//                       >
//                         {item.hadithStatus || "Sahih"}
//                       </span>
//                     </td>

//                     {/* External Link */}
//                     <td style={{ padding: "16px 14px", textAlign: "right" }}>
//                       {item.sourceUrl ? (
//                         <a
//                           href={item.sourceUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           style={{
//                             fontSize: "13px",
//                             fontWeight: 600,
//                             color: "var(--green)",
//                             textDecoration: "none",
//                             display: "inline-flex",
//                             alignItems: "center",
//                             gap: "4px",
//                           }}
//                         >
//                           View ↗
//                         </a>
//                       ) : (
//                         <span style={{ fontSize: "13px", color: "var(--muted)" }}>-</span>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

import React from "react";

export interface DailyHadithItem {
  identifier: string;
  bookTitle: string;
  hadithNumber: string;
  chapter: string;
  arabicPreview: string;
  englishPreview: string;
  hadithStatus: string;
  sourceUrl?: string;
  tradition?: string;
}

export interface DailyHadithTableProps {
  topicTitle?: string;
  dayNumber?: number;
  runDate?: string;
  remainingInPool?: number;
  hadiths?: DailyHadithItem[];
}

export function DailyHadithTable({
  topicTitle = "First Wahi",
  dayNumber = 1,
  runDate = "",
  remainingInPool = 0,
  hadiths = [],
}: DailyHadithTableProps) {
  const safeHadiths = Array.isArray(hadiths) ? hadiths : [];

  return (
    <div style={{ marginBottom: "60px" }}>
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          paddingBottom: "16px",
          marginBottom: "20px",
        }}
      >
        <div>
          <span
            className="pill"
            style={{
              background: "var(--green2)",
              color: "var(--green)",
              fontWeight: 700,
              fontSize: "12px",
              padding: "4px 10px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--green)",
                display: "inline-block",
              }}
            />
            Auto-rotates daily
          </span>
          <h3 style={{ margin: "8px 0 4px", fontSize: "20px", fontWeight: 700 }}>
            {topicTitle}
          </h3>
          <div className="meta" style={{ fontSize: "13px" }}>
            Day {dayNumber} ({runDate}) • {remainingInPool} candidates remaining in pool
          </div>
        </div>
      </div>

      {/* Card grid section */}
      {safeHadiths.length === 0 ? (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "30px",
            color: "var(--muted)",
            background: "var(--white)",
            border: "1px solid var(--line)",
            borderRadius: "var(--r)",
          }}
        >
          No hadiths available for today&apos;s daily selection.
        </div>
      ) : (
        <div
          className="cards"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {safeHadiths.map((item, idx) => {
            const isShia =
              item.bookTitle.includes("Kafi") ||
              item.bookTitle.includes("Nahj") ||
              item.tradition === "Twelver Shia";

            return (
              <div
                key={item.identifier || idx}
                className="card"
                style={{
                  padding: "20px",
                  background: "var(--white)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r)",
                  boxShadow: "var(--shadow)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {/* Top row: index + tradition badge */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "12px",
                      color: "var(--muted)",
                    }}
                  >
                    #{idx + 1}
                  </span>
                  <span
                    className="pill"
                    style={{
                      background: isShia ? "#f3e8ff" : "#e0f2fe",
                      color: isShia ? "#6b21a8" : "#0369a1",
                      borderColor: isShia ? "#d8b4fe" : "#bae6fd",
                      fontWeight: 600,
                      fontSize: "11px",
                    }}
                  >
                    {isShia ? "Twelver Shia" : "Sunni"}
                  </span>
                </div>

                {/* Book & Hadith Number */}
                <div>
                  <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: "15px" }}>
                    {item.bookTitle}
                  </div>
                  <div className="meta" style={{ marginTop: "2px", fontSize: "13px" }}>
                    Hadith #{item.hadithNumber}
                  </div>
                  {item.chapter && (
                    <div
                      className="meta"
                      style={{
                        marginTop: "4px",
                        fontSize: "12px",
                        fontStyle: "italic",
                        color: "#857e72",
                      }}
                    >
                      {item.chapter}
                    </div>
                  )}
                </div>

                {/* Arabic & English Text */}
                <div>
                  <div
                    className="arabic"
                    style={{
                      fontSize: "18px",
                      lineHeight: "1.7",
                      marginBottom: "8px",
                      color: "var(--ink)",
                      textAlign: "right",
                    }}
                  >
                    {item.arabicPreview}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      lineHeight: "1.6",
                      color: "var(--ink)",
                      opacity: 0.9,
                    }}
                  >
                    {item.englishPreview}
                  </div>
                </div>

                {/* Bottom row: grade + source, pushed to bottom */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "10px",
                    borderTop: "1px solid var(--line)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="pill"
                    style={{
                      background:
                        item.hadithStatus === "sahih"
                          ? "var(--green2)"
                          : item.hadithStatus === "hasan"
                          ? "#fef3c7"
                          : "#f3f4f6",
                      color:
                        item.hadithStatus === "sahih"
                          ? "var(--green)"
                          : item.hadithStatus === "hasan"
                          ? "#92400e"
                          : "#4b5563",
                      fontWeight: 700,
                      fontSize: "11px",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.hadithStatus || "Sahih"}
                  </span>

                  {item.sourceUrl ? (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--green)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      View ↗
                    </a>
                  ) : (
                    <span style={{ fontSize: "13px", color: "var(--muted)" }}>-</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}