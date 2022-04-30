"use strict";
exports.__esModule = true;
exports.IARBusiness = void 0;
var DefaultReportHeaderTopics;
(function (DefaultReportHeaderTopics) {
    DefaultReportHeaderTopics["OVERVIEW"] = "Overview";
    DefaultReportHeaderTopics["INSPECTION_HISTORY_AND_STATUS"] = "Inspection history and status";
})(DefaultReportHeaderTopics || (DefaultReportHeaderTopics = {}));
var IARBusiness = /** @class */ (function () {
    function IARBusiness() {
    }
    /**
     *
     * @param reportTemplates ReportTemplate[]
     * @description reportTemplates is sorted entity by descending of createdAt
     * @returns list of merge report header
     */
    IARBusiness.mergeReportHeadersFromReportTemplates = function (reportTemplates) {
        var _a, _b, _c;
        if (reportTemplates.length === 0)
            return [];
        // Init map for searching node
        var reportHeadersMap = new Map();
        var mergeResultMap = new Map();
        for (var i = 0; i < reportTemplates[0].reportHeaders.length; i++) {
            reportHeadersMap.set(reportTemplates[0].reportHeaders[i].id, reportTemplates[0].reportHeaders[i]);
            mergeResultMap.set(reportTemplates[0].reportHeaders[i].id, {
                mappingId: ''
            });
        }
        // transformReportHeadersToHierarchy for every report templates
        for (var i = 0; i < reportTemplates.length; i++) {
            this.transformReportHeadersToHierarchy(reportTemplates[i]);
        }
        // Init finalReportHeaders
        var finalReportHeaders = reportTemplates[0].reportHeaders;
        // Loop all report templates for merging their report headers
        for (var i = 1; i < reportTemplates.length; i++) {
            // Traverse report headers with DFS algorithm
            var stackCurrentReportHeaders = reportTemplates[i].reportHeaders; // Don't care nested
            var _loop_1 = function () {
                var node = stackCurrentReportHeaders.shift();
                if (!node)
                    return "break";
                console.log('node: ', node.id, node.serialNumber, node.topic);
                // 1.  Put this node to suitable position
                // 1.1: Find currFinalSiblings
                var currFinalSiblings = void 0;
                var parentSerialNumber = '';
                // Check header is level 1
                if (!node.parentId) {
                    currFinalSiblings = finalReportHeaders;
                }
                else {
                    // Find node parent in finalReportHeaders
                    var finalNodeParentId = ((_a = mergeResultMap.get(node.parentId)) === null || _a === void 0 ? void 0 : _a.mappingId) || node.parentId;
                    node.parentId = finalNodeParentId;
                    parentSerialNumber = ((_b = reportHeadersMap.get(finalNodeParentId)) === null || _b === void 0 ? void 0 : _b.serialNumber) || '';
                    currFinalSiblings = ((_c = reportHeadersMap.get(finalNodeParentId)) === null || _c === void 0 ? void 0 : _c.children) || [];
                }
                // 1.2: Update serialNumber
                if (node.topic !== DefaultReportHeaderTopics.OVERVIEW &&
                    node.topic !== DefaultReportHeaderTopics.INSPECTION_HISTORY_AND_STATUS) {
                    node.serialNumber = parentSerialNumber
                        ? parentSerialNumber + '.' + (currFinalSiblings.length + 1)
                        : currFinalSiblings.length + 1 + '';
                }
                // 1.3: Check if currFinalSiblings include same topic
                var duplicateTopicNode = currFinalSiblings.find(function (item) { return item.topic === node.topic; });
                if (duplicateTopicNode) {
                    // update merge mapping id
                    if (node.id !== duplicateTopicNode.id) {
                        mergeResultMap.set(node.id, { mappingId: duplicateTopicNode.id });
                    }
                }
                else {
                    // Put this node to suitable position (Done 1)
                    currFinalSiblings.push(node);
                }
                // 2: Update reportHeadersMap
                reportHeadersMap.set(node.id, node);
                // 3: Update stack
                for (var t = node.children.length - 1; t >= 0; t--) {
                    stackCurrentReportHeaders.unshift(node.children[t]);
                }
            };
            while (stackCurrentReportHeaders.length > 0) {
                var state_1 = _loop_1();
                if (state_1 === "break")
                    break;
            }
        }
        return this.transformReportHeadersToList(finalReportHeaders);
    };
    IARBusiness.transformReportHeadersToHierarchy = function (reportTemplate) {
        var _a;
        var reportHeaders = reportTemplate.reportHeaders;
        var newHierarchyReportHeaders = [];
        var reportHeadersMap = new Map(); // support search report headers
        // Populate report headers to map
        for (var x = 0; x < reportHeaders.length; x++) {
            if (!reportHeaders[x].children)
                reportHeaders[x].children = [];
            reportHeadersMap.set(reportHeaders[x].id, reportHeaders[x]);
        }
        // Handle parent children relation
        for (var x = 0; x < reportHeaders.length; x++) {
            // Check report header level 1
            if (!reportHeaders[x].parentId) {
                newHierarchyReportHeaders.push(reportHeaders[x]);
            }
            else {
                // Add current header to children array of its parent
                (_a = reportHeadersMap.get(reportHeaders[x].parentId)) === null || _a === void 0 ? void 0 : _a.children.push(reportHeaders[x]);
            }
        }
        reportTemplate.reportHeaders = newHierarchyReportHeaders;
    };
    IARBusiness.transformReportHeadersToList = function (nestedReportHeaders) {
        var res = [];
        var stack = nestedReportHeaders;
        while (stack.length > 0) {
            var node = stack.shift();
            if (!node)
                break;
            res.push(node);
            // 3: Update stack
            for (var t = node.children.length - 1; t >= 0; t--) {
                stack.unshift(node.children[t]);
            }
        }
        return res;
    };
    return IARBusiness;
}());
exports.IARBusiness = IARBusiness;
function main() {
    var reportTemplates = [
        {
            id: 'RT1',
            reportHeaders: [
                { id: '0.1', serialNumber: 'I', topic: 'Overview' },
                { id: '0.2', serialNumber: 'IA', topic: 'Inspection history and status' },
                { id: '1', serialNumber: '1', topic: 'topic 1' },
                { id: '3', serialNumber: '3', topic: 'topic 3' },
                { id: '4', serialNumber: '1.1', topic: 'topic 1 sub', parentId: '1' },
                { id: '5', serialNumber: '1.2.1', topic: 'topic 1 sub1', parentId: '6' },
                { id: '6', serialNumber: '1.2', topic: 'topic 1 sub2', parentId: '1' },
                { id: '7', serialNumber: '2.1.1', topic: 'topic abc', parentId: '8' },
                { id: '8', serialNumber: '2.1', topic: 'topic xyz', parentId: '2' },
                { id: '9', serialNumber: '2.1.1.1', topic: 'topic mkl', parentId: '7' },
                { id: '2', serialNumber: '2', topic: 'topic 1' },
            ]
        },
        {
            id: 'RT2',
            reportHeaders: [
                { id: '10.1', serialNumber: 'I', topic: 'Overview' },
                { id: '10.2', serialNumber: 'IA', topic: 'Inspection history and status' },
                { id: '20', serialNumber: '1', topic: 'topic 1' },
                { id: '30', serialNumber: '2', topic: 'topic 2' },
                { id: '40', serialNumber: '1.1', topic: 'topic 1 sub', parentId: '20' },
                { id: '50', serialNumber: '1.2.1', topic: 'topic 1 sub1 (RT2)', parentId: '60' },
                { id: '60', serialNumber: '1.2', topic: 'topic 1 sub2', parentId: '20' },
                { id: '70', serialNumber: '2.1.1', topic: 'topic abc', parentId: '80' },
                { id: '80', serialNumber: '2.1', topic: 'topic xyz', parentId: '30' },
                { id: '90', serialNumber: '2.1.1.1', topic: 'topic mkl (RT2)', parentId: '70' },
            ]
        }
    ];
    var res = IARBusiness.mergeReportHeadersFromReportTemplates(reportTemplates);
    console.log(JSON.stringify(res));
    console.log('LongPK done');
}
main();
