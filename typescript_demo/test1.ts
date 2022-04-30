interface ReportHeader {
  id: string;
  serialNumber: string;
  topic: string;
  reportTemplateId: string;
  parentId: string;
  children: ReportHeader[];

}

interface ReportTemplate {
  id: string;
  reportHeaders: ReportHeader[];

}

interface MergeResultModel {
  mappingId: string;
}

enum DefaultReportHeaderTopics {
  OVERVIEW = 'Overview',
  INSPECTION_HISTORY_AND_STATUS = 'Inspection history and status',
}

export class IARBusiness {
  /**
   *
   * @param reportTemplates ReportTemplate[]
   * @description reportTemplates is sorted entity by descending of createdAt
   * @returns list of merge report header
   */
  static mergeReportHeadersFromReportTemplates(reportTemplates: ReportTemplate[]) {
    if (reportTemplates.length === 0) return [];

    // Init map for searching node
    const reportHeadersMap = new Map<string, ReportHeader>();
    const mergeResultMap = new Map<string, MergeResultModel>();
    for (let i = 0; i < reportTemplates[0].reportHeaders.length; i++) {
      reportHeadersMap.set(
        reportTemplates[0].reportHeaders[i].id,
        reportTemplates[0].reportHeaders[i],
      );
      mergeResultMap.set(reportTemplates[0].reportHeaders[i].id, {
        mappingId: '',
      });
    }

    // transformReportHeadersToHierarchy for every report templates
    for (let i = 0; i < reportTemplates.length; i++) {
      this.transformReportHeadersToHierarchy(reportTemplates[i]);
    }

    // Init finalReportHeaders
    const finalReportHeaders: ReportHeader[] = []; //reportTemplates[0].reportHeaders;

    // Loop all report templates for merging their report headers
    for (let i = 0; i < reportTemplates.length; i++) {
      // Traverse report headers with DFS algorithm
      const stackCurrentReportHeaders: ReportHeader[] = reportTemplates[i].reportHeaders; // Don't care nested
      while (stackCurrentReportHeaders.length > 0) {
        const node = stackCurrentReportHeaders.shift();
        if(!node) break;

        console.log('node: ', node.id, node.serialNumber, node.topic)

        // 1.  Put this node to suitable position
        // 1.1: Find currFinalSiblings
        let currFinalSiblings: ReportHeader[];
        let parentSerialNumber = '';
        // Check header is level 1
        if (!node.parentId) {
          currFinalSiblings = finalReportHeaders;
        } else {
          // Find node parent in finalReportHeaders
          const finalNodeParentId = mergeResultMap.get(node.parentId)?.mappingId || node.parentId;
          node.parentId = finalNodeParentId;

          parentSerialNumber = reportHeadersMap.get(finalNodeParentId)?.serialNumber || '';
          currFinalSiblings = reportHeadersMap.get(finalNodeParentId)?.children || [];
        }

        // 1.2: Update serialNumber
        if (
          node.topic !== DefaultReportHeaderTopics.OVERVIEW &&
          node.topic !== DefaultReportHeaderTopics.INSPECTION_HISTORY_AND_STATUS
        ) {
          // Check if currFinalSiblings have current node (same id)
          const indexOfCurrNode = currFinalSiblings.indexOf(node);
          
          const counter = (indexOfCurrNode >= 0 ? indexOfCurrNode : currFinalSiblings.length) + 1 + '';
          node.serialNumber = parentSerialNumber
            ? parentSerialNumber + '.' + counter
            : counter;
        }

        // 1.3: Find node in currFinalSiblings have same topic
        const duplicateTopicNode = currFinalSiblings.find((item) => item.topic === node.topic);
        // Check duplicate node
        if (duplicateTopicNode) {
          // update merge mapping id
          if (node.id !== duplicateTopicNode.id) {
            mergeResultMap.set(node.id, { mappingId: duplicateTopicNode.id });
          }
        } else {
          // Put this node to suitable position (Done 1)
          currFinalSiblings.push(node);
        }

        // 2: Update reportHeadersMap
        reportHeadersMap.set(node.id, node);
        
        // 3: Update stack
        for (let t = node.children.length - 1; t >= 0; t--) {
          stackCurrentReportHeaders.unshift(node.children[t]);
        }
      }
    }

    return this.transformReportHeadersToList(finalReportHeaders);
  }

  private static transformReportHeadersToHierarchy(reportTemplate: ReportTemplate) {
    const reportHeaders = reportTemplate.reportHeaders;
    const newHierarchyReportHeaders: ReportHeader[] = [];
    const reportHeadersMap = new Map<string, ReportHeader>(); // support search report headers

    // Populate report headers to map
    for (let x = 0; x < reportHeaders.length; x++) {
      if (!reportHeaders[x].children) reportHeaders[x].children = [];

      reportHeadersMap.set(reportHeaders[x].id, reportHeaders[x]);
    }

    // Handle parent children relation
    for (let x = 0; x < reportHeaders.length; x++) {
      // Check report header level 1
      if (!reportHeaders[x].parentId) {
        newHierarchyReportHeaders.push(reportHeaders[x]);
      } else {
        // Add current header to children array of its parent
        reportHeadersMap.get(reportHeaders[x].parentId)?.children.push(reportHeaders[x]);
      }
    }

    reportTemplate.reportHeaders = newHierarchyReportHeaders;
  }

  private static transformReportHeadersToList(nestedReportHeaders: ReportHeader[]) {
    const res: ReportHeader[] = [];
    const stack: ReportHeader[] = nestedReportHeaders;
    while (stack.length > 0) {
      const node = stack.shift();
      if(!node) break;

      res.push(node);

      // 3: Update stack
      for (let t = node.children.length - 1; t >= 0; t--) {
        stack.unshift(node.children[t]);
      }
      Reflect.deleteProperty(node, 'children');
    }

    return res;
  }
}

function main(){
  const reportTemplates: ReportTemplate[] = [
    {
      id: 'RT1',
      reportHeaders: [
        {id: '0.1', serialNumber: '1', topic: 'Overview', } as ReportHeader,
        {id: '0.2', serialNumber: '2', topic: 'Inspection history and status', } as ReportHeader,
        {id: '1', serialNumber: '3', topic: 'topic 1', } as ReportHeader,
        {id: '3', serialNumber: '5', topic: 'topic 3', } as ReportHeader,
        {id: '4', serialNumber: '3.1', topic: 'topic 1 sub', parentId: '1' } as ReportHeader,
        {id: '5', serialNumber: '3.2.1', topic: 'topic 1 sub1', parentId: '6' } as ReportHeader,
        {id: '6', serialNumber: '3.2', topic: 'topic 1 sub2', parentId: '1' } as ReportHeader,
        {id: '7', serialNumber: '4.1.1', topic: 'topic abc', parentId: '8' } as ReportHeader,
        {id: '8', serialNumber: '4.1', topic: 'topic xyz', parentId: '2' } as ReportHeader,
        {id: '9', serialNumber: '4.1.1.1', topic: 'topic mkl', parentId: '7' } as ReportHeader,
        {id: '2', serialNumber: '4', topic: 'topic 1', } as ReportHeader,
      ]
    },
    {
      id: 'RT2',
      reportHeaders: [
        {id: '10.1', serialNumber: '1', topic: 'Overview', } as ReportHeader,
        {id: '10.2', serialNumber: '2', topic: 'Inspection history and status', } as ReportHeader,
        {id: '20', serialNumber: '3', topic: 'topic 1', } as ReportHeader,
        {id: '30', serialNumber: '4', topic: 'topic 2 (RT2)', } as ReportHeader,
        {id: '40', serialNumber: '3.1', topic: 'topic 1 sub', parentId: '20' } as ReportHeader,
        {id: '50', serialNumber: '3.2.1', topic: 'topic 1 sub1 (RT2)', parentId: '60' } as ReportHeader,
        {id: '60', serialNumber: '3.2', topic: 'topic 1 sub2', parentId: '20' } as ReportHeader,
        {id: '70', serialNumber: '4.1.1', topic: 'topic abc', parentId: '80' } as ReportHeader,
        {id: '80', serialNumber: '4.1', topic: 'topic xyz', parentId: '30' } as ReportHeader,
        {id: '100', serialNumber: '4.2', topic: 'topic xyz', parentId: '30' } as ReportHeader,
        {id: '90', serialNumber: '4.1.1.1', topic: 'topic mkl (RT2)', parentId: '70' } as ReportHeader,
        
      ]
    }
  ];

  const res = IARBusiness.mergeReportHeadersFromReportTemplates(reportTemplates);
  console.log(JSON.stringify(res));
  console.log('LongPK done');
}

main();